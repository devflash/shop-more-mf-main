const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  console.log(env.development);
  return {
    entry: './src/index.js',
    mode: 'development',
    devServer: {
      port: 8086,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'ordersMf',
        filename: 'remoteEntry.js',
        remotes: {
          commonComponentMf: `commonComponentMf@//localhost:8082/remoteEntry.js`,
        },
        exposes: {
          './OrdersPage': './src/pages/orders',
        },
        shared: [
          { react: { requiredVersion: '^18.1.0' } },
          'react-dom/client',
          {
            '@devflash/shared-shopmore-lib': {
              import: '@devflash/shared-shopmore-lib',
              requiredVersion: '2.0.5',
            },
          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new Dotenv({ path: `./.env` }),
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
  };
};