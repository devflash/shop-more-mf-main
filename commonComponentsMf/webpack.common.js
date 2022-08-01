const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
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
      name: 'commonComponentMf',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/button',
        './Input': './src/components/input',
        './Dialog': './src/components/dialog',
        './Currency': './src/components/currency',
        './Layout': './src/components/layout',
        './Loader': './src/components/loader',
        './Toast': './src/components/toast',
      },
      shared: [
        { react: { requiredVersion: '^18.1.0' } },
        'react-dom/client',
        'react-icons',
      ],
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
