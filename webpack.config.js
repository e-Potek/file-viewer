const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

const BUILD_DIR = path.resolve(__dirname, './dist');
const APP_DIR = path.resolve(__dirname, './src');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    index: APP_DIR,
    'pdf.worker': path.join(
      __dirname,
      './node_modules/pdfjs-dist/build/pdf.worker.js',
    ),
  },
  externals: ['react', 'react-dom', /@mui\/material\/.*/],
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    library: '@resolve_ch/file-viewer',
    libraryTarget: 'umd',
  },
});
