import React from 'react';
import { css } from '@emotion/react';
import CartComp from '../../components/cartComp';
import Layout from 'commonComponentMf/Layout';

const customLayout = css`
  height: calc(100vh - 78px);
  padding: 10px;
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
