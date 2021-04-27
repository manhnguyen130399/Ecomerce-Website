import { Injectable } from '@angular/core';
import { Store } from '@core/model/store';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private loginSuccess = new BehaviorSubject<boolean>(false);

  loginSuccessEmitted$ = this.loginSuccess.asObservable();

  private storeInfo = new BehaviorSubject<Store>(null);

  loadStoreInfoSEmitted$ = this.storeInfo.asObservable()

  loginSuccessEvent() {
    this.loginSuccess.next(true);
  }

  storeInfoSuccessEvent(store: Store) {
    this.storeInfo.next(store)
  }

  constructor() { }
}
