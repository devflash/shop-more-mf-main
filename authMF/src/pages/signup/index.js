import React from 'react';
import { css } from '@emotion/react';
import Layout from 'commonComponentMf/Layout';
import SignUpComp from '../../components/signup';
const layoutStyle = css`
  min-height: calc(100vh - 62px);
  padding-top: 30px;
  padding-bottom: 30px;
  height: auto;
`;

const SignUp = () => (
  <Layout customCss={layoutStyle}>
    <SignUpComp />
  </Layout>
);

export default SignUp;
