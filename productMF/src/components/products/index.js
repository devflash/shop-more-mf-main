import React, { useEffect, useReducer } from 'react';
import { css } from '@emotion/react';
import config from '../../config';
import Loader from 'commonComponentMf/Loader';
import Currency from 'commonComponentMf/Currency';
import axios from 'axios';
import useLoader from '../../hooks/useLoader';
const wrapper = css`
  width: 90vw;
  margin: 0px auto;
  padding-top: 50px;
  @media screen and (min-width: 376px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const productLink = css`
  border: none;
  outline: none;
  display: block;
  text-decoration: none;
  color: #000000;
  margin-bottom: 20px;
`;

const card = css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 20px 10px;
  background-color: #fff;
  box-shadow: 4px 2px 10px 0px #95a5a6;
  h3 {
    font-size: 1.2rem;
    margin-top: 12px;
  }
`;
const imageWrapper = css`
  height: 200px;
  width: 200px;
  margin: 0 auto;
  position: relative;
`;

const productinfo = css`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  width: 80%;
  margin: 15px auto;
  span {
    font-size: 1.1rem;
  }
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
  products: [],
};
const Products = ({ navigateRoute }) => {
  const [state, dispatch] = useReducer((state, newState) => {
    return { ...state, ...newState };
  }, initialState);
  console.log('products');
  const [{ isLoading, isBackdrop }, setLoading] = useLoader({});
  const { API_SERVER } = config;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_SERVER}/api/products`);
        console.log(data);
        if (data) {
          dispatch({ products: data });
        }
      } catch (e) {}
    };
    fetchData();
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} isBackdrop={isBackdrop} />

      <div css={wrapper}>
        {state.products.map((cur) => (
          <button
            onClick={() => navigateRoute(`/product/${cur.productId}`)}
            key={cur.id}
            css={productLink}
          >
            <div css={card}>
              <div css={imageWrapper}>
                <img src={cur.image} alt={cur.title} css={productImg} />
              </div>

              <h3>{cur.title}</h3>
              <div css={productinfo}>
                <span css={cost}>
                  Cost: <Currency />
                  {cur.price}
                </span>
                <span>Rating: {cur.rating}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default Products;
