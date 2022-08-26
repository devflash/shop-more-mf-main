import React, { Suspense } from 'react';
// import SignUpPage from 'authMf/SignUpPage';
// import SignInPage from 'authMf/SignInPage';
// import ProductPage from 'productMf/Product';
// import ProductsPage from 'productMf/Products';
// import OrdersPage from 'ordersMf/OrdersPage';
// import CartPage from 'cartMf/CartPage';
// import AddressPage from 'cartMf/AddressPage';
// import PreviewPage from 'cartMf/PreviewPage';
// import PaymentPage from 'cartMf/PaymentPage';
// import WishlistPage from 'wishlistMf/WishlistPage';
import Loader from 'commonComponentMf/Loader';

const SignInPage = React.lazy(() => import('authMf/SignInPage'));
const SignUpPage = React.lazy(() => import('authMf/SignUpPage'));
const ProductPage = React.lazy(() => import('productMf/Product'));
const ProductsPage = React.lazy(() => import('productMf/Products'));
const OrdersPage = React.lazy(() => import('ordersMf/OrdersPage'));
const CartPage = React.lazy(() => import('cartMf/CartPage'));
const AddressPage = React.lazy(() => import('cartMf/AddressPage'));
const PreviewPage = React.lazy(() => import('cartMf/PreviewPage'));
const PaymentPage = React.lazy(() => import('cartMf/PaymentPage'));
const WishlistPage = React.lazy(() => import('wishlistMf/WishlistPage'));

import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

const Container = () => {
  const navigate = useNavigate();

  const navigateRoute = (path) => {
    navigate(path);
  };

  const getParams = () => useParams();

  return (
    <Suspense fallback={<Loader isLoading={true} isBackdrop={true} />}>
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
          path="/wishlist/:userId"
          element={
            <WishlistPage navigateRoute={navigateRoute} getParams={getParams} />
          }
        ></Route>
        <Route
          path="/"
          element={<ProductsPage navigateRoute={navigateRoute} />}
        ></Route>
      </Routes>
    </Suspense>
  );
};

export default Container;
