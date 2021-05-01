import { Injectable } from '@angular/core';
import { Store } from '@core/model/store/store';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private loginSuccess = new BehaviorSubject<boolean>(false);

  loginSuccessEmitted$ = this.loginSuccess.asObservable();

  private storeId = new BehaviorSubject<number>(null);

  loadStoreInfoSEmitted$ = this.storeId.asObservable()

  loginSuccessEvent() {
    this.loginSuccess.next(true);
  }

  storeInfoSuccessEvent(id: number) {
    this.storeId.next(id)
  }

  constructor() { }
}
