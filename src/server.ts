/* tslint:disable no-console */

const domino = require('domino');
const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.join(__dirname, '.', 'dist', 'index.html')).toString();
const win = domino.createWindow(template);
const compression = require('compression');

global['window'] = win;
global['document'] = win.document;
global['Document'] = win.document;
global['DOMTokenList'] = win.DOMTokenList;
global['Node'] = win.Node;
global['Text'] = win.Text;
global['HTMLElement'] = win.HTMLElement;
global['navigator'] = win.navigator;

import 'zone.js/dist/zone-node';
import './polyfills.server';
import './rxjs.imports';

import * as express from 'express';

import {ServerAppModule} from './app/server.app.module';
import {ngExpressEngine} from '@nguniversal/express-engine';
import {routes} from './server.routes';
import {App} from './mock-api/app';
import {enableProdMode} from '@angular/core';
import {UNIVERSAL_PORT} from '../constants';


enableProdMode();
const app = express();
const api = new App();
const baseUrl = `http://localhost:${UNIVERSAL_PORT}`;

app.engine('html', ngExpressEngine({
  bootstrap: ServerAppModule
}));

app.set('view engine', 'html');
app.set('views', 'src');

app.use(compression());
app.use('/', express.static('dist', {index: false}));
app.use('/assets', express.static(path.join(__dirname, 'assets'), {maxAge: 30}));

routes.forEach(route => {
  app.get('/' + route, (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    global['navigator'] = req['headers']['user-agent'];
    res.render('../dist/index', {
      req: req,
      res: res
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
  });
});

app.get('/data', (req, res) => {
  console.time(`GET: ${req.originalUrl}`);
  res.json(api.getData());
  console.timeEnd(`GET: ${req.originalUrl}`);
});

app.listen(UNIVERSAL_PORT, () => {
  console.log(`Listening at ${baseUrl}`);
});
