const path = require('path');
const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',

  devServer: {
    port: 8086,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
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
            requiredVersion: '3.0.1',
          },
        },
        'axios',
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
