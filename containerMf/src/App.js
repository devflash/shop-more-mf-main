import React from 'react';
import Container from './page/container';
import Header from './components/header';

import { BrowserRouter } from 'react-router-dom';
import { Global, css } from '@emotion/react';

const App = () => (
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
    <BrowserRouter>
      <Header />
      <Container />
    </BrowserRouter>
  </>
);

export default App;
