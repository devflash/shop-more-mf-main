import React from 'react';
import { css } from '@emotion/react';
import ProductComp from '../../components/product';
import Layout from 'commonComponentMf/Layout';

const layoutStyle = css`
  background-color: #fff;
`;

const Product = () => (
  <Layout layoutStyle={layoutStyle}>
    <ProductComp />
  </Layout>
);

export default Product;
