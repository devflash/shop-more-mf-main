import React from 'react';
import { css } from '@emotion/react';
import Layout from 'commonComponentMf/Layout';
import SignupComp from '../../components/signupComp';
const layoutStyle = css`
  min-height: calc(100vh - 62px);
  padding-top: 30px;
  padding-bottom: 30px;
  height: auto;
`;

const SignUp = ({ navigateRoute }) => (
  <Layout customCss={layoutStyle}>
    <SignupComp navigateRoute={navigateRoute} />
  </Layout>
);

export default SignUp;
