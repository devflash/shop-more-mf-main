import React from 'react';
import { css } from '@emotion/react';
import OrdersComp from '../../components/ordersComp';
import Layout from 'commonComponentMf/Layout';

const layoutStyle = css`
  min-height: calc(100vh - 62px);
  padding-top: 30px;
  padding-bottom: 30px;
  height: auto;
`;

const Orders = () => (
  <Layout layoutStyle={layoutStyle}>
    <OrdersComp />
  </Layout>
);

export default Orders;
