import React from 'react';
import Products from './pages/products';
import Product from './pages/product';
import Navigation from './components/navigation';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';

const APP = () => (
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/products" element={<Products />}></Route>
      <Route path="/product" element={<Product />}></Route>
      <Route path="/" element={<Products />}></Route>
    </Routes>
  </BrowserRouter>
);

export default APP;
