import React from 'react';
import SignUpPage from 'authMf/SignUpPage';
import SignInPage from 'authMf/SignInPage';
import ProductPage from 'productMf/Product';
import ProductsPage from 'productMf/Products';
import OrdersPage from 'ordersMf/OrdersPage';
import CartPage from 'cartMf/CartPage';
import AddressPage from 'cartMf/AddressPage';
import PreviewPage from 'cartMf/PreviewPage';
import PaymentPage from 'cartMf/PaymentPage';

import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

const Container = () => {
  const navigate = useNavigate();

  const navigateRoute = (path) => {
    navigate(path);
  };

  const getParams = () => useParams();

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
        element={
          <ProductPage navigateRoute={navigateRoute} getParams={getParams} />
        }
      ></Route>
      <Route
        path="/orders/:userId"
        element={
          <OrdersPage navigateRoute={navigateRoute} getParams={getParams} />
        }
      ></Route>
      <Route
        path="/cart/:userId"
        element={
          <CartPage navigateRoute={navigateRoute} getParams={getParams} />
        }
      ></Route>
      <Route
        path="/address/:userId"
        element={
          <AddressPage navigateRoute={navigateRoute} getParams={getParams} />
        }
      ></Route>
      <Route
        path="/preview"
        element={<PreviewPage navigateRoute={navigateRoute} />}
      ></Route>
      <Route
        path="/payment"
        element={<PaymentPage navigateRoute={navigateRoute} />}
      ></Route>
      <Route
        path="/"
        element={<ProductsPage navigateRoute={navigateRoute} />}
      ></Route>
    </Routes>
  );
};

export default Container;
