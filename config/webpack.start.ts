/* tslint:disable: variable-name*/

import {WebpackOptions} from '../webpack.config';
import {WebpackConfig} from '../webpack';
import {DEV_SERVER_PORT} from '../constants';
import * as path from 'path';

const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common');

const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

module.exports = (options: WebpackOptions): WebpackConfig => {
  return webpackMerge(commonConfig(options), {
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.styl$/,
          loader: 'to-string-loader!css-loader!stylus-loader',
          include: path.resolve('src/app')
        },
        {
          test: /\.styl$/,
          loader: 'style-loader!css-loader!stylus-loader',
          include: path.resolve('src/assets/styles')
        },
      ]
    },
    devServer: {
        contentBase: './src',
        port: DEV_SERVER_PORT,
        historyApiFallback: {
          disableDotRule: true,
        },
        stats: 'minimal',
        host: '0.0.0.0',
        watchOptions: {
          poll: undefined,
          aggregateTimeout: 300,
          ignored: /node_modules/
        }
    },
    plugins: [
      new NamedModulesPlugin()
    ]
  });
};
