import React, { useEffect, useReducer, useContext } from 'react';
import { css } from '@emotion/react';
import Input from 'commonComponentMf/Input';
import Button from 'commonComponentMf/Button';
import Toast from 'commonComponentMf/Toast';
import Loader from 'commonComponentMf/Loader';
import config from '../../config';
import useLoader from '../../hooks/useLoader';
import axios from 'axios';
import { getErrorMessage } from '../../utils/handleError';
import { useAuthContext } from '@devflash/shared-shopmore-lib';

// import { useAuth } from '../../context';
// import { useRouter } from 'next/router';

const flex = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const wrapper = css`
  max-width: 450px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  h1 {
    text-align: center;
    font-size: 1.5rem;
  }
`;

const container = css``;

const row = css`
  margin-bottom: 20px;
  width: 100%;
`;

const note = css`
  font-size: 0.7rem;
`;

const createBtn = css`
  border: none;
  background-color: #ffd814;
  border-color: #fcd200;
  border-radius: 10px;
  padding: 12px 20px;
  cursor: pointer;
  margin: 0 auto;
`;

const alignCenter = css`
  text-align: center;
`;

const inputCSS = (isError) => css`
  border-color: ${isError && '#c0392b'};
`;

const errorCss = css`
  color: #c0392b;
  font-size: 0.7rem;
`;

const initialState = {
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
  serviceError: '',
};

const SignIn = ({ navigateRoute }) => {
  const [state, dispatch] = useReducer((state, newState) => {
    return { ...state, ...newState };
  }, initialState);
  const { updateAuth } = useAuthContext();
  const [{ isLoading, isBackdrop }, setLoading] = useLoader({});
  const { API_SERVER } = config;

  const onEmailChanged = (email) => {
    dispatch({ email, emailError: null });
  };
  const onPasswordChanged = (password) => {
    dispatch({ password, passwordError: null });
  };

  const validateInput = () => {
    let isValid = true;
    if (!state.email) {
      dispatch({ emailError: 'Please Enter your email address' });
      isValid = false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)) {
      dispatch({ emailError: 'Please Enter a valid email address' });
      isValid = false;
    }
    if (!state.password) {
      dispatch({ passwordError: 'Please enter password' });
      isValid = false;
    }
    return isValid;
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    if (validateInput()) {
      setLoading({ isLoading: true, isBackdrop: true });

      try {
        // await signInUser(state.email, state.password);
        // router.push('/');
        const payload = {
          email: state.email,
          password: state.password,
        };
        const { data } = await axios.post(`${API_SERVER}/api/signIn`, payload);
        // const data = { msg: 'SIGNED_IN_SUCCESS' };
        if (data.msg === 'SIGNED_IN_SUCCESS') {
          updateAuth(data.authUser);
          navigateRoute('/');
        }
      } catch (e) {
        const serviceError = getErrorMessage(e);
        dispatch({ serviceError });
      }
    }
    setLoading({ isLoading: false, isBackdrop: false });
  };

  return (
    <div css={flex}>
      <Toast
        open={state.serviceError}
        text={state.serviceError}
        callback={() => dispatch({ serviceError: '' })}
        isError={true}
      />
      <Loader isLoading={isLoading} isBackdrop={isBackdrop} />

      <div css={wrapper}>
        <h1>ShopMore</h1>
        <div css={container}>
          <form>
            <div css={row}>
              <Input
                id="email"
                type="email"
                labelTitle="Email address"
                value={state.email}
                onValueChange={(e) => onEmailChanged(e.target.value)}
                customCss={inputCSS(state.emailError)}
              />
              <span css={errorCss}>{state.emailError}</span>
            </div>
            <div css={row}>
              <Input
                id="password"
                type="password"
                labelTitle="Password"
                value={state.password}
                onValueChange={(e) => onPasswordChanged(e.target.value)}
                customCss={inputCSS(state.passwordError)}
              />
              <span css={errorCss}>{state.passwordError}</span>
            </div>
            <div css={alignCenter}>
              <Button
                label="Login"
                customCss={createBtn}
                onClick={(e) => handleUserLogin(e)}
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
