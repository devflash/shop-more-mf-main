const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

const domain = process.env.PROD_DOMAIN;
module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new ModuleFederationPlugin({
      name: 'containerMf',
      remotes: {
        commonComponentMf: `commonComponentMf@/commonComponentsmf/latest/remoteEntry.js`,
        productMf: `productMf@/productmf/latest/remoteEntry.js`,
        authMf: `authMf@/authmf/latest/remoteEntry.js`,
        ordersMf: `ordersMf@/ordersmf/latest/remoteEntry.js`,
        cartMf: `cartMf@/cartmf/latest/remoteEntry.js`,
        wishlistMf: `wishlistMf@/wishlistmf/latest/remoteEntry.js`,
      },
      shared: [
        { react: { requiredVersion: '^18.1.0' } },
        'react-dom/client',
        {
          '@devflash/shared-shopmore-lib': {
            import: '@devflash/shared-shopmore-lib',
            requiredVersion: '3.0.1',
          },
        },
        '@emotion/react',
        'axios',
        'react-router-dom',
        'react-icons',
      ],
    }),
    new Dotenv({ path: `./.env` }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/containermf/latest/',
  },
});
