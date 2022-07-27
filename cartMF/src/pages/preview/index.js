import React from 'react';
import { css } from '@emotion/react';
import PreviewComp from '../../components/previewComp';
import Layout from 'commonComponentMf/Layout';

const layoutStyle = css`
  min-height: calc(100vh - 62px);
  padding-top: 30px;
`;

const Preview = ({ navigateRoute }) => (
  <Layout layoutStyle={layoutStyle}>
    <PreviewComp navigateRoute={navigateRoute} />
  </Layout>
);

export default Preview;
