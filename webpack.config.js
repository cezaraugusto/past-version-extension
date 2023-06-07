const path = require('path')
const webpack = require('webpack')
const WebExtension = require('webpack-target-webextension')
const ReactRefreshTypeScript = require('react-refresh-typescript')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlPlugin = require('../../dist/module').default

/** @returns {webpack.Configuration} */
const config = (a, env) => ({
  devtool: env.mode === 'production' ? undefined : 'eval-cheap-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [env.mode === 'development' && ReactRefreshTypeScript()].filter(Boolean),
            }),
          },
        },
      },
    ],
  },
  entry: {
    reloader: path.join(__dirname, '../src/reloader.js'),
    background: path.join(__dirname, 'src/background/index.ts'),
    content: path.join(__dirname, 'src/content/index.tsx'),
  },
  output: {
    path: path.join(__dirname, './dist'),
    // Our assets are emitted in /dist folder of our web extension.
    publicPath: '/dist/',
    environment: {
      dynamicImport: true,
    },
  },
  plugins: [
    new HtmlPlugin({
      manifestPath: path.join(__dirname, './manifest-plugin.json'),
      staticDir: path.join(__dirname, './static'),
    }),
    new MiniCssExtractPlugin(),
    new WebExtension({
      background: { entry: 'reloader' },   
      // Remove this if you're not using mini-css-extract-plugin.
      weakRuntimeCheck: true
    }),
    env.mode === 'development' && new ReactRefreshPlugin(),
  ],
  devServer: {
    // Allow HMR on the dev server when available. Will do
    // a full reload if hot reloading is not available,
    // i.e. static files and JS entries imported from the HTML file (<script>).
    hot: 'only',
    watchFiles: [
      'src/**/*.html',
    ],
  },
  optimization: {
    minimize: false,
  },
})
module.exports = config
