/* tslint:disable: variable-name*/

import * as path from 'path';
import {DEV_SERVER_PORT, HOST, STORE_DEV_TOOLS} from '../constants';
import {WebpackOptions} from '../webpack.config';
import {WebpackConfig} from '../webpack';
import {root} from '../helpers';

import {CheckerPlugin} from 'awesome-typescript-loader';

const {DefinePlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

module.exports = (options: WebpackOptions): WebpackConfig => {
  return {
    mode: options.mode,
    target: 'web',
    entry: {
      main: root('./src/main.browser.ts')
    },
    output: {
      path: root('dist'),
      filename: 'main.js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            root('node_modules/@angular'),
            root('node_modules/rxjs')
          ]
        },
        {
          test: /\.ts$/,
          loaders: [
            '@angularclass/hmr-loader',
            'awesome-typescript-loader?{configFileName: "tsconfig.webpack.json"}',
            'angular2-template-loader',
            'angular-router-loader?loader=system&genDir=compiled&aot=false'
          ],
          exclude: [/\.(spec|e2e|d)\.ts$/]
        },
        {test: /\.json$/, loader: 'json-loader'},
        {test: /\.html/, loader: 'raw-loader'},
        {test: /\.pug$/, loader: 'apply-loader!pug-loader?self', exclude: ['src/index.pug']},
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
    plugins: [
      new CheckerPlugin(),
      new DefinePlugin({
        HOST: JSON.stringify(HOST),
        PORT: JSON.stringify(DEV_SERVER_PORT),
        STORE_DEV_TOOLS: JSON.stringify(STORE_DEV_TOOLS),
        ENV: JSON.stringify(options.mode),
        'process.env': {
          NODE_ENV: options.mode
        }
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.pug',
        hash: true
      }),
      new HtmlWebpackPugPlugin(),
    ],
    node: {
      global: true,
      process: true,
      Buffer: false,
      crypto: true,
      module: false,
      clearImmediate: false,
      setImmediate: false,
      clearTimeout: true,
      setTimeout: true
    }
  };
};
