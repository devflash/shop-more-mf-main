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
      port: 8081,
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
        name: 'authMf',
        remotes: {
          commonComponentMf: `commonComponentMf@//localhost:8082/remoteEntry.js`,
        },
        shared: [{ react: { requiredVersion: '^18.1.0' } }, 'react-dom/client'],
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
