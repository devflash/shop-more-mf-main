const Dotenv = require('dotenv-webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8083,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'wishlistMf',
      filename: 'remoteEntry.js',
      exposes: {
        './WishlistPage': './src/pages/wishlistReact',
      },
      remotes: {
        commonComponentMf: `commonComponentMf@//localhost:8082/remoteEntry.js`,
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
    new Dotenv({
      path: './.env.development',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
});
