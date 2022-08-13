const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

const domain = process.env.PROD_DOMAIN;

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new ModuleFederationPlugin({
      name: 'authMf',
      filename: 'remoteEntry.js',
      remotes: {
        commonComponentMf: `commonComponentMf@${domain}/commonComponentMf/remoteEntry.js`,
      },
      exposes: {
        './SignInPage': './src/pages/signIn',
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
        'react-router-dom',
        '@emotion/react',
      ],
    }),
    new Dotenv({ path: `./.env` }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
});
