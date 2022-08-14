const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const { ModuleFederationPlugin } = require('webpack').container;
const packageJson = require('../package.json');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8081,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'authMf',
      filename: 'remoteEntry.js',
      remotes: {
        commonComponentMf: `commonComponentMf@//localhost:8082/remoteEntry.js`,
      },
      exposes: {
        './SignUpPage': './src/pages/sign-up',
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
    new Dotenv({ path: `./.env.development` }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
});
