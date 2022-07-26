import React, { useContext } from 'react';
import Container from './page/container';
import Header from './components/header';

import { BrowserRouter } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import { authContext, useAuth } from '@devflash/shared-shopmore-lib';

const App = () => {
  const auth = useAuth();

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
        <BrowserRouter>
          <Header />
          <Container />
        </BrowserRouter>
      </authContext.Provider>
    </>
  );
};
export default App;
