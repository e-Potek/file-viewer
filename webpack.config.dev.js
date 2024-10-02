const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:8081/',
      'webpack/hot/dev-server',
      path.resolve(__dirname, './src/dev/app.js'),
    ],
    'pdf.worker': 'pdfjs-dist/build/pdf.worker.mjs',
  },
  devServer: {
    open: true,
    port: 8081,
  },
  module: {
    rules: [
      {
        test: [
          /\.jpg$/,
          /\.docx$/,
          /\.csv$/,
          /\.mp4$/,
          /\.xlsx$/,
          /\.doc$/,
          /\.pdf$/,
        ],
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      process: { env: {} },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/dev/index.html'),
    }),
  ],
});
