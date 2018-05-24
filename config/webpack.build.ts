/* tslint:disable: variable-name*/

import {WebpackMode, WebpackOptions} from '../webpack.config';
import {WebpackConfig} from '../webpack';
import * as path from 'path';

const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common');
const {NoEmitOnErrorsPlugin} = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (options: WebpackOptions): WebpackConfig => {
  return webpackMerge(commonConfig(options), {
    mode: options.mode,
    module: {
      /*rules: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
        },
        {
          test: /\.styl$/,
          use: ExtractTextPlugin.extract('css-loader!stylus-loader'),
          exclude: /node_modules/
        }
      ]*/
    },
    plugins: [
      new NoEmitOnErrorsPlugin(),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            beautify: false,
            comments: false
          }
        }
      }),
      new ExtractTextPlugin('styles.css')
    ]
  });
};
