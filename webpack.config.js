const path = require('path');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, './dist');
const APP_DIR = path.resolve(__dirname, './src');

const config = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    index: APP_DIR,
    'pdf.worker': path.join(
      __dirname,
      './node_modules/pdfjs-dist/build/pdf.worker.js',
    ),
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    library: '@resolve_ch/file-viewer',
    libraryTarget: 'umd',
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    fallback: {
      buffer: require.resolve('buffer'),
      util: require.resolve('util'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  },
  externals: [
    'react',
    'react-dom',
    /@mui\/material\/.*/,
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, './src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^pdfjs-dist$/, resource => {
      resource.request = path.join(
        __dirname,
        './node_modules/pdfjs-dist/webpack',
      );
    }),
  ],
};

module.exports = config;
