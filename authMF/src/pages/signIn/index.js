import React from 'react';
import { css } from '@emotion/react';
import SigninComp from '../../components/signinComp';
import Layout from 'commonComponentMf/Layout';

const layoutStyle = css`
  min-height: calc(100vh - 62px);
  padding-top: 30px;
  padding-bottom: 30px;
  height: auto;
`;

const SignIn = ({ navigateRoute }) => (
  <Layout layoutStyle={layoutStyle}>
    <SigninComp navigateRoute={navigateRoute} />
  </Layout>
);

export default SignIn;
