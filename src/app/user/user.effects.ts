import {of as observableOf} from 'rxjs';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {LogoutFail, LogoutSuccess, UserActionTypes} from './user.actions';
import {AppState} from '../reducers';
import {UserService} from './user.service';

@Injectable()

export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService
  ) {
  }

  @Effect() logout$ = this.actions$
    .ofType(UserActionTypes.Logout)
    // .map((action: Logout) => action.payload)
    .switchMap(() =>
      this.userService.logout()
        .mergeMap((res) => observableOf(
          new LogoutSuccess(res)
          )
        )
        .catch((err) => observableOf(
          new LogoutFail(err)
        ))
    );
}
