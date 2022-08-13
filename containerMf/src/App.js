import React, { useContext } from 'react';
import Container from './page/container';
import Header from './components/header';

import { BrowserRouter } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import {
  authContext,
  useAuth,
  orderContext,
  useOrders,
} from '@devflash/shared-shopmore-lib';

const App = () => {
  console.log('container!');
  const auth = useAuth();
  const orders = useOrders();
  return (
    <>
      <Global
        styles={css`
          *,
          ::before,
          ::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-size: 16px;
          }
        `}
      />
      <authContext.Provider value={auth}>
        <orderContext.Provider value={orders}>
          <BrowserRouter>
            <Header />
            <Container />
          </BrowserRouter>
        </orderContext.Provider>
      </authContext.Provider>
    </>
  );
};
export default App;
