import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private loginSuccess = new BehaviorSubject<boolean>(false);

  loginSuccessEmitted$ = this.loginSuccess.asObservable();

  loginSuccessEvent() {
    this.loginSuccess.next(true);
  }

  constructor() { }
}
