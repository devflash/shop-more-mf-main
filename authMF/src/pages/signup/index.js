import React from 'react';
import { css } from '@emotion/react';
import Navigation from '../../components/navigation';

const container = css`
  background-color: blue;
`;
const SignUp = () => (
  <div css={container}>
    <Navigation />
    <h1>Sign Up Page</h1>
  </div>
);

export default SignUp;
