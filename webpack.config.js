const path = require('path');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/assets/js/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].[hash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/html/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'image-parallax.html',
      template: 'src/html/image-parallax.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[hash].css',
      chunkFilename: 'assets/css/[name].[hash].css',
    }),
  ],
  module: {
    rules: [{
      test: /\.(png|jpe?g|gif|ogg)$/,
      loader: 'file-loader',
      options: {
        name: 'assets/img/[name].[hash].[ext]',
        esModule: false,
      },

    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
    {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../../',
        },
      },
      {
        loader: 'css-loader',
        options: {
          // url: false
        },
      }],
    },
    {
      test: /\.ttf$/,
      use: {
        loader: 'url-loader',
      },
    },
    {
      test: /\.svg/,
      use: {
        loader: 'svg-url-loader',
        options: {},
      },
    },
    ],
  },
};
