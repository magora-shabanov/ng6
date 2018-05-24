/* tslint:disable: variable-name*/

export enum WebpackCommand {
  START = 'start',
  BUILD = 'build'
}

export enum WebpackMode {
  DEVELOPMENT= 'development',
  PRODUCTION = 'production',
  NONE = 'none'
}

export interface WebpackOptions {
  command: WebpackCommand;
  mode: WebpackMode;
  environment: string;
}

const COMMAND = WebpackCommand.BUILD;
const MODE = WebpackMode.PRODUCTION;
const ENVIRONMENT = 'local';

const options: WebpackOptions = {
  command: COMMAND,
  mode: MODE,
  environment: ENVIRONMENT
};

switch (options.command) {
  case WebpackCommand.BUILD:
    module.exports = require('./config/webpack.build')(options);
    break;
  case WebpackCommand.START:
  default:
    module.exports = require('./config/webpack.start')(options);
    break;
}
