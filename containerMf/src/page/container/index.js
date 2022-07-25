import React from 'react';
import SignUpPage from 'authMf/SignUpPage';
import SignInPage from 'authMf/SignInPage';
import ProductPage from 'productMf/Product';
import ProductsPage from 'productMf/Products';
import { Routes, Route, useNavigate } from 'react-router-dom';

const Container = () => {
  const navigate = useNavigate();
  const navigateRoute = (path) => {
    navigate(path);
  };
  return (
    <Routes>
      <Route
        path="/signup"
        element={<SignUpPage navigateRoute={navigateRoute} />}
      ></Route>
      <Route
        path="/signIn"
        element={<SignInPage navigateRoute={navigateRoute} />}
      ></Route>
      <Route
        path="/product/:productId"
        element={<ProductPage navigateRoute={navigateRoute} />}
      ></Route>
      <Route
        path="/"
        element={<ProductsPage navigateRoute={navigateRoute} />}
      ></Route>
    </Routes>
  );
};

export default Container;
