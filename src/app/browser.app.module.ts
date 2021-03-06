/* tslint:disable max-line-length */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './common/components/app/app.component';
import { AppModule } from './app.module';
import { BrowserTransferStateModule } from '../libs/transfer-state/browser-transfer-state.module';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    BrowserTransferStateModule,
    AppModule
  ]
})
export class BrowserAppModule { }
