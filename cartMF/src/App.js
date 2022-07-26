import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Cart from './pages/cart';
import Payment from './pages/payment';
import Address from './pages/address';
import Preview from './pages/preview';
import Navigation from './components/navigation';
const App = () => (
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/payment" element={<Payment />}></Route>
      <Route path="/preview" element={<Preview />}></Route>
      <Route path="/address" element={<Address />}></Route>
      <Route path="/" element={<Cart />}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;
