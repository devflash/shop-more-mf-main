import React from 'react';
import { css } from '@emotion/react';
import SignInComp from '../../components/signin';
import Layout from 'commonComponentMf/Layout';

const layoutStyle = css`
  min-height: calc(100vh - 62px);
  padding-top: 30px;
  padding-bottom: 30px;
  height: auto;
`;

const SignIn = () => (
  <Layout layoutStyle={layoutStyle}>
    <SignInComp />
  </Layout>
);

export default SignIn;
