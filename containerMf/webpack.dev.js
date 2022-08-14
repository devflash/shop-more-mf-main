const path = require('path');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'containerMf',
      remotes: {
        commonComponentMf: `commonComponentMf@//localhost:8082/remoteEntry.js`,
        productMf: `productMf@//localhost:8085/remoteEntry.js`,
        authMf: `authMf@//localhost:8081/remoteEntry.js`,
        ordersMf: `ordersMf@//localhost:8086/remoteEntry.js`,
        cartMf: `cartMf@//localhost:8084/remoteEntry.js`,
        wishlistMf: `wishlistMf@//localhost:8083/remoteEntry.js`,
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
    new Dotenv({ path: `./.env.development` }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
});
