# Complete starter seed project for Angular 2

## Bootstrap and Universal Branch

> Featuring Bootstrap 4 and ng-bootstrap, Webpack 2 (and Webpack DLL plugin for faster dev builds), HMR (Hot Module Replacement), Universal for server-side rendering and @ngrx for state management.

###### You can use npm, but it's recommended to use npm as it installs a lot faster and has other benefits https://npmpkg.com/ . Make sure you are using npm version 0.16.0 or newer (check with 'npm --version')

```bash
npm start 
```
or 
```bash
npm start 
```
## Features

* Angular 2
  * Async loading
  * Treeshaking
  * AOT (Ahead of Time/ Offline) Compilation
  * AOT safe SASS compilation
* Webpack 3
  * Webpack Dlls (Speeds up devServer builds)
  * @ngTools AOT plugin
* HMR (Hot Module Replacement)
* TypeScript 2
  * @types
* Bootstrap 4 and @ng-bootstrap
* Universal (Server-side Rendering)
* @ngrx
  * store (RxJS powered state management for Angular2 apps, inspired by Redux)
  * effects (Side effect model for @ngrx/store)
  * router-store (Bindings to connect angular/router to ngrx/store)
  * store-devtools (Developer Tools for @ngrx/store)
  * store-log-monitor (Log Monitor for @ngrx/store-devtools and Angular 2)
  * ngrx-store-logger (Advanced console logging for @ngrx/store applications, ported from redux-logger.)
  * ngrx-store-freeze in dev mode (@ngrx/store meta reducer that prevents state from being mutated.)

## Basic scripts

Use `npm start` for dev server. Default dev port is `3000`.

Use `npm run start:hmr` to run dev server in HMR mode.

Use `npm run build` for production build.

Use `npm run server:prod` for production server and production watch. Default production port is `8088`.

Use `npm run universal` to run production build in Universal. To run and build universal in AOT mode, use
`npm run universal:aot`. Default universal port is `8000`.

Default ports and option to use proxy backend for dev server can be changed in `constants.js` file.

To create AOT version, run `npm run build:aot`. This will compile and build script.
Then you can use `npm run prodserver` to see to serve files.

### Store Log Monitor / Store Logger

In development mode, the store log monitor appears on the right hand of your screen. This allows
you to view your stored state and manipulate your state history. By default, the monitor is NOT imported
when you are in production mode. State history is also not saved in production mode.

There is also an option to use store-logger which outputs to the console instead of your application view.
To set your development mode store logging preference, go to the constant.js file and edit the `STORE_DEV_TOOLS` constant.
Available options are `monitor | logger | both | none`

### HMR (Hot Module Replacement)

HMR mode allows you to update a particular module without reloading the entire application.
The current state of your app is also stored in @ngrx/store allowing you to make updates to your
code without losing your currently stored state.

### AOT  Don'ts

The following are some things that will make AOT compile fail.

- Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
- Don’t use default exports.
- Don’t use form.controls.controlName, use form.get(‘controlName’)
- Don’t use control.errors?.someError, use control.hasError(‘someError’)
- Don’t use functions in your providers, routes or declarations, export a function and then reference that function name
- Inputs, Outputs, View or Content Child(ren), Hostbindings, and any field you use from the template or annotate for Angular should be public
