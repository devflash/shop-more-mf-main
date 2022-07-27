import React from 'react';
import { css } from '@emotion/react';
import AddressComp from '../../components/addressComp';
import Layout from 'commonComponentMf/Layout';

const customLayout = css`
  min-height: calc(100vh - 78px);
  padding: 10px;
`;

const Address = ({
  getParams = () => ({ userId: '4uQG6ItEQYfozhlwHa72jMu1l172' }),
  navigateRoute,
}) => {
  const { userId } = getParams();

  return (
    <Layout customLayout={customLayout}>
      <AddressComp userId={userId} navigateRoute={navigateRoute} />
    </Layout>
  );
};

export default Address;
