import React from 'react';
import { css } from '@emotion/react';
import Navigation from '../../components/navigation';
const container = css`
  background-color: green;
`;
const SignIn = () => (
  <div css={container}>
    <Navigation />
    <h1>Sign In Page</h1>
  </div>
);

export default SignIn;
