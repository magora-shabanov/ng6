import {ApplicationRef, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {createInputTransfer, createNewHosts, removeNgStyles} from '@angularclass/hmr';

import {Store} from '@ngrx/store';

import {BrowserTransferStateModule} from '../libs/transfer-state/browser-transfer-state.module';
import {APP_IMPORTS} from './app.imports';
import {routes} from './app.routing';

import {AppComponent} from './common/components/app/app.component';

import {AppState, CustomSerializer} from './reducers';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NotFound404Component} from './common/components/not-found/not-found404.component';
import {UserService} from './user/user.service';
import {RouterStateSerializer} from '@ngrx/router-store';
import {TransferState} from '@angular/platform-browser';
import {SelectivePreloadingStrategy} from './common/selective-preloading-strategy';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFound404Component
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    HttpClientModule,
    APP_IMPORTS,
    RouterModule.forRoot(routes, {
      enableTracing: false, // <-- debugging purposes only
      useHash: false,
      preloadingStrategy: SelectivePreloadingStrategy,
    }),
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    SelectivePreloadingStrategy,
    UserService,
    TransferState
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef,
              private _store: Store<AppState>) {
  }

  hmrOnInit(store) {
    if (!store || !store.rootState) return;

    // restore state by dispatch a SET_ROOT_STATE action
    if (store.rootState) {
      this._store.dispatch({
        type: 'SET_ROOT_STATE',
        payload: store.rootState
      });
    }

    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }

  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    this._store.take(1).subscribe(s => store.rootState = s);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
