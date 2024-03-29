import React, { useReducer } from 'react';
import { css } from '@emotion/react';
import Input from 'commonComponentMf/Input';
// import { useAuth } from '../../context';
import Button from 'commonComponentMf/Button';
import { getErrorMessage } from '../../utils/handleError';
import Toast from 'commonComponentMf/Toast';
import Loader from 'commonComponentMf/Loader';
import useLoader from '../../hooks/useLoader';
import config from '../../config';
import axios from 'axios';

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
`;

const note = css`
  font-size: 0.7rem;
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
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  firstNameError: null,
  lastNameError: null,
  emailError: null,
  passwordError: null,
  serviceError: null,
  success: null,
};

const SignUp = ({ navigateRoute }) => {
  const [state, dispatch] = useReducer((state, newState) => {
    return { ...state, ...newState };
  }, initialState);
  const [{ isLoading, isBackdrop }, setLoading] = useLoader({});
  const { API_SERVER } = config;
  const onFirstNameChanged = (firstName) => {
    dispatch({ firstName, firstNameError: null });
  };
  const onLastNameChanged = (lastName) => {
    dispatch({ lastName, lastNameError: null });
  };
  const onEmailChanged = (email) => {
    dispatch({ email, emailError: null });
  };
  const onPasswordChanged = (password) => {
    dispatch({ password, passwordError: null });
  };
  const validateInput = () => {
    let isValid = true;
    if (!state.firstName) {
      dispatch({ firstNameError: 'Please Enter your first name' });
      isValid = false;
    }
    if (!state.lastName) {
      dispatch({ lastNameError: 'Please Enter your last name' });
      isValid = false;
    }
    if (!state.email) {
      dispatch({ emailError: 'Please Enter your first name' });
      isValid = false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)) {
      dispatch({ emailError: 'Please Enter a valid email address' });
      isValid = false;
    }
    if (state.password.length < 8) {
      dispatch({ passwordError: true });
      isValid = false;
    }
    return isValid;
  };
  const handleCreateAccount = async (event) => {
    event.preventDefault();
    if (validateInput()) {
      setLoading({ isLoading: true, isBackdrop: true });

      try {
        const payload = {
          email: state.email,
          password: state.password,
          firstName: state.firstName,
          lastName: state.lastName,
        };
        const { data } = await axios.post(`${API_SERVER}/api/signUp`, payload);
        if (data.msg === 'ACCOUNT_CREATED') {
          // setAuthUser(data.authUser);
          dispatch({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            success: 'Your account has been created successfuly',
          });
          navigateRoute('/');
        }
      } catch (e) {
        const errorMessage = getErrorMessage(e);
        dispatch({ serviceError: errorMessage });
      }
    }
    setLoading({ isLoading: false, isBackdrop: false });
  };
  return (
    <div css={flex}>
      <Toast
        open={state.serviceError || state.success}
        text={state.serviceError || state.success}
        callback={() => dispatch({ serviceError: '', success: '' })}
        isError={state.serviceError ? true : false}
      />
      <Loader isLoading={isLoading} isBackdrop={isBackdrop} />

      <div css={wrapper}>
        <h1>ShopMore</h1>
        <div css={container}>
          <form>
            <div css={row}>
              <Input
                id="firstName"
                labelTitle="First name"
                value={state.firstName}
                onValueChange={(e) => onFirstNameChanged(e.target.value)}
                customCss={inputCSS(state.firstNameError)}
              />
              <span css={errorCss}>{state.firstNameError}</span>
            </div>
            <div css={row}>
              <Input
                id="lastName"
                labelTitle="Last name"
                value={state.lastName}
                onValueChange={(e) => onLastNameChanged(e.target.value)}
                customCss={inputCSS(state.lastNameError)}
              />
              <span css={errorCss}>{state.lastNameError}</span>
            </div>
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
              <span css={[note, state.passwordError && errorCss]}>
                Password must be atleast 8 characters
              </span>
            </div>
            <div css={alignCenter}>
              <Button
                onClick={(e) => handleCreateAccount(e)}
                label=" Create account"
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
