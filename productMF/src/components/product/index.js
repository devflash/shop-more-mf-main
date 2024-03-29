import React, { useReducer, useEffect } from 'react';
import { css } from '@emotion/react';
import config from '../../config';
import Toast from 'commonComponentMf/Toast';
import axios from 'axios';
import { getErrorMessage } from '../../utils/handleError';
import Loader from 'commonComponentMf/Loader';
import useLoader from '../../hooks/useLoader';
import Currency from 'commonComponentMf/Currency';
import { useAuthContext } from '@devflash/shared-shopmore-lib';

const wrapper = css`
  padding-top: 50px;
  padding-bottom: 100px;
  max-width: 800px;
  margin: 0 auto;
  @media screen and (min-width: 600px) {
    display: flex;
    padding: 50px 25px 0;
  }
`;
const imageWrapper = css`
  height: 200px;
  width: 200px;
  margin: 0 auto;
  position: relative;
  @media screen and (min-width: 600px) {
    height: 300px;
    width: 300px;
  }
`;

const info = css`
  padding: 0 20px;
  margin-top: 25px;
  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  @media screen and (min-width: 600px) {
    flex: 1 1 60%;
    margin-top: 0;
  }
`;

const productinfo = css`
  margin-bottom: 20px;
`;

const fixedCartBtn = css`
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 15px 10px;
  border: none;
  outline: none;
  background-color: #ffd814;
  border-color: #fcd200;
  @media screen and (min-width: 600px) {
    display: none;
  }
`;

const row = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const inStock = css`
  color: #27ae60;
  font-weight: bold;
`;

const outOfStock = css`
  color: #c0392b;
  font-weight: bold;
`;

const btnContainer = css`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: 20px auto 0;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const productBtn = css`
  border: none;
  background-color: #ffd814;
  border-color: #fcd200;
  border-radius: 10px;
  padding: 12px 20px;
  cursor: pointer;
`;

const greyback = css`
  background-color: #95a5a6;
  color: #fff;
`;

const cost = css`
  display: flex;
  align-items: center;
`;

const productImg = css`
  width: 100%;
  height: 100%;
`;

const initialState = {
  product: null,
  serviceError: null,
  success: null,
};
const Product = ({ navigateRoute, productId = '0WC46FebJ8ppvjDbmPqg' }) => {
  const { authUser } = useAuthContext();
  const [{ isLoading, isBackdrop }, setLoading] = useLoader({});
  const { API_SERVER } = config;
  const [state, dispatch] = useReducer((state, newState) => {
    return {
      ...state,
      ...newState,
    };
  }, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${API_SERVER}/api/product/${productId}`
      );
      dispatch({ product: data });
    };
    fetchData();
  }, [productId]);

  const handleWishlist = async () => {
    if (authUser) {
      setLoading({ isLoading: true, isBackdrop: true });
      try {
        const payload = {
          ...state.product,
          userId: authUser.uid,
        };
        const { data } = await axios.post(
          `${API_SERVER}/api/wishlist/add`,
          payload
        );
        const { msg } = data;

        if (msg === 'WISHLIST_SUCCESS') {
          dispatch({ success: 'Product has been added to your wishlist' });
        }
      } catch (error) {
        const error_code = error?.response?.data;
        const serviceError = getErrorMessage(error_code);
        dispatch({ serviceError });
      }
    } else {
      navigateRoute('/signin');
    }
    setLoading({ isLoading: false, isBackdrop: false });
  };

  const handleAddToCart = async () => {
    if (authUser) {
      setLoading({ isLoading: true, isBackdrop: true });
      try {
        const payload = {
          ...state.product,
          userId: authUser.uid,
        };
        const { data } = await axios.post(
          `${API_SERVER}/api/cart/add`,
          payload
        );
        const { msg } = data;
        if (msg === 'PRODUCT_ADDED_CART') {
          dispatch({ success: 'Product has been added to your cart' });
        }
      } catch (e) {
        const error_code = e?.response?.data;
        const serviceError = getErrorMessage(error_code);
        dispatch({ serviceError });
      }
    } else {
      navigateRoute('/signin');
    }
    setLoading({ isLoading: false, isBackdrop: false });
  };

  return (
    <>
      {state.product && (
        <>
          <Toast
            open={state.serviceError || state.success}
            text={state.serviceError || state.success}
            callback={() => dispatch({ serviceError: '', success: '' })}
            isError={state.serviceError ? true : false}
          />
          <Loader isLoading={isLoading} isBackdrop={isBackdrop} />
          <div css={wrapper}>
            <div css={imageWrapper}>
              <img
                src={state.product.image}
                alt={state.product.title}
                css={productImg}
              />
            </div>
            <div css={info}>
              <h2>{state.product.title}</h2>
              <div css={productinfo}>
                <div css={row}>
                  <span css={cost}>
                    Price: <Currency />
                    {state.product.price}
                  </span>
                  <span>Rating: {state.product.rating}</span>
                </div>
                <div css={row}>
                  <span>Category: {state.product.category}</span>
                  <span>
                    Status:{' '}
                    <span css={state.product.stock > 0 ? inStock : outOfStock}>
                      {state.product.stock > 0 ? 'In stock' : 'Out of stock'}
                    </span>
                  </span>
                </div>
              </div>
              <p>{state.product.description}</p>
              <div css={btnContainer}>
                <button type="button" css={productBtn} onClick={handleWishlist}>
                  Add to wishlist
                </button>
                <button
                  type="button"
                  disabled={state.product.stock <= 0}
                  onClick={handleAddToCart}
                  css={[productBtn, state.product.stock <= 0 && greyback]}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <button type="button" css={fixedCartBtn}>
            Add to cart
          </button>
        </>
      )}
    </>
  );
};

export default Product;
