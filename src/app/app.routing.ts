/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFound404Component } from './common/components/not-found/not-found404.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'lazy', loadChildren: './modules/lazy/index#LazyModule' /*data: {preload: true} <---- for preloading */ },
  { path: '**', component: NotFound404Component }
];
