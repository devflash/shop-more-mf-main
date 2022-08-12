import React from 'react';
import { css } from '@emotion/react';
import SignIn from './pages/signIn';
// import SignUp from './pages/signUp';
import Navigation from './components/navigation';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';

const container = css`
  background-color: blue;
`;

const App = () => (
  <>
    <BrowserRouter>
      <Navigation />
      <Routes>
        {/* <Route path="/signup" element={<SignUp />}></Route> */}
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/" element={<SignIn />}></Route>
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
