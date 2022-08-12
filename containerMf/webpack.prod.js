const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const domain = process.env.PROD_DOMAIN;
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new ModuleFederationPlugin({
      name: 'containerMf',
      remotes: {
        commonComponentMf: `commonComponentMf@${domain}commonComponentMf/remoteEntry.js`,
        productMf: `productMf@${domain}/productMf/remoteEntry.js`,
        authMf: `authMf@${domain}/authMf/remoteEntry.js`,
        ordersMf: `ordersMf@${domain}/ordersMf/remoteEntry.js`,
        cartMf: `cartMf@${domain}/cartMf/remoteEntry.js`,
        wishlistMf: `wishlistMf@${domain}/wishlistMf/remoteEntry.js`,
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
