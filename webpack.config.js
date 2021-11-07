const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");

const pkg = require('./package.json');

module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 9000,
  },
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|wav)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  stats: {
    warnings: false
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new WebpackBar({ name: 'Building', profile: true }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: "./electron.main.js", to: "main.js" },
    //   ],
    // }),
    new HtmlWebpackPlugin({
      title: pkg.build.productName,
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
      },
      scriptLoading: 'module'
    }),
  ],
  target: ['web', 'es2018'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
};