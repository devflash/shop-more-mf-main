import React from 'react';
import { css } from '@emotion/react';
import CartComp from '../../components/cartComp';
import Layout from 'commonComponentMf/Layout';

const customLayout = css`
  min-height: calc(100vh - 78px);
  padding-top: 30px;
  padding-bottom: 30px;
  height: auto;
`;

const Cart = ({
  getParams = () => ({ userId: '4uQG6ItEQYfozhlwHa72jMu1l172' }),
  navigateRoute,
}) => {
  const { userId } = getParams();

  return (
    <Layout customLayout={customLayout}>
      <CartComp userId={userId} navigateRoute={navigateRoute} />
    </Layout>
  );
};

export default Cart;
