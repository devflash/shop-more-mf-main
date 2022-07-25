import React from 'react';
import ProductsComp from '../../components/products';
import Layout from 'commonComponentMf/Layout';

const Products = ({ navigateRoute }) => (
  <Layout>
    <ProductsComp navigateRoute={navigateRoute} />
  </Layout>
);

export default Products;
