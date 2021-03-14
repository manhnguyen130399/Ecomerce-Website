import { SellerRegister } from '@app/modules/auth/models/seller-register';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { StoreRegister } from '@app/modules/auth/models/store-register';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private childEmitChangeStep = new Subject<any>();
  private sellerObject = new SellerRegister();
  private storeObject = new StoreRegister();

  private parentNextEmit = new BehaviorSubject<StoreRegister>(this.storeObject);
  private parentPrevEmit = new BehaviorSubject<SellerRegister>(this.sellerObject);
  private sellerFormValid = new BehaviorSubject<boolean>(false);

  childChangeEmitted$ = this.childEmitChangeStep.asObservable();
  parentNextEmitted$ = this.parentNextEmit.asObservable();
  parentPrevEmitted$ = this.parentPrevEmit.asObservable();
  sellerFormValidEmitted$ = this.sellerFormValid.asObservable();

  childEmitChange(change: any) {
    this.childEmitChangeStep.next(change);
  }

  emitNextFromParent(change: any) {
    this.parentNextEmit.next(change);
    this.sellerFormValid.next(true);
  }

  emitPrevFromParent(change: any) {
    this.parentPrevEmit.next(change);
  }
}
