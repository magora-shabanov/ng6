import {ReactiveFormsModule} from '@angular/forms';

import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {useLogMonitor} from '@ngrx/store-log-monitor';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TransferHttpModule} from '../libs/transfer-http/transfer-http.module';

import {AppState, DEV_REDUCERS, resetOnLogout, syncReducers} from './reducers';
import {StoreDevToolsModule} from '../libs/store-devtools/store-devtools.module';
import {RouterEffects} from './effects/router';
import {UserEffects} from './user/user.effects';

const STORE_DEV_TOOLS_IMPORTS = [];
if (ENV === 'development' &&
  ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
) STORE_DEV_TOOLS_IMPORTS.push(...[
  StoreDevtoolsModule.instrument({
    monitor: useLogMonitor({
      visible: true,
      position: 'right'
    })
  })
]);

export const metaReducers: MetaReducer<AppState>[] = ENV === 'development' ?
  [...DEV_REDUCERS, resetOnLogout] : [resetOnLogout];

export const APP_IMPORTS = [
  EffectsModule.forRoot([
    RouterEffects,
    UserEffects
  ]),
  NgbModule.forRoot(),
  ReactiveFormsModule,
  StoreModule.forRoot(syncReducers, {metaReducers}),
  StoreRouterConnectingModule.forRoot({
    stateKey: 'router' // name of reducer key
  }),
  STORE_DEV_TOOLS_IMPORTS,
  StoreDevToolsModule,
  TransferHttpModule
];
