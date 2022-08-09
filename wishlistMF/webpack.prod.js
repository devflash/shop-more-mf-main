const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin;
const domain = process.env.PROD_DOMAIN;

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new ModuleFederationPlugin({
      name: 'wishlistMf',
      filename: 'remoteEntry.js',
      exposes: {
        './WishlistPage': './src/pages/wishlistReact',
      },
      remotes: {
        commonComponentMf: `commonComponentMf@${domain}/remoteEntry.js`,
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
        'axios',
        'react-dom',
      ],
    }),
    new Dotenv({ path: `./.env` }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
});
