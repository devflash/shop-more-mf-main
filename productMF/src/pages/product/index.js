import React from 'react';
import { css } from '@emotion/react';
import ProductComp from '../../components/product';
import Layout from 'commonComponentMf/Layout';

const layoutStyle = css`
  background-color: #fff;
`;

const Product = ({ navigateRoute }) => (
  <Layout layoutStyle={layoutStyle}>
    <ProductComp navigateRoute={navigateRoute} />
  </Layout>
);

export default Product;
