import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferState } from '../../../../libs/transfer-state/transfer-state';
import { Store, select } from '@ngrx/store';

import { views } from '../../../app-nav-views';
import { MOBILE } from '../../../services/constants';

import * as fromRoot from '../../../reducers/index';

import '../../../../assets/styles/base.styl';

@Component({
  selector: 'app',
  styleUrls: ['app.component.styl'],
  templateUrl: './app.component.pug',
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  showMonitor = (ENV === 'development' &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );
  mobile = MOBILE;
  views = views;

  constructor(
    private cache: TransferState,
    public route: ActivatedRoute,
    public router: Router,
    public store: Store<fromRoot.AppState>
  ) {}


  ngOnInit() {
    this.cache.set('cached', true);
    let a = this.store.pipe(select(fromRoot.getUserLoaded));
    a.subscribe(l => console.log(l));
  }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }
}
