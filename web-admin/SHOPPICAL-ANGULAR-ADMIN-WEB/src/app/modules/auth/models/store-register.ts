export class StoreRegister {
  storeAddress: string;
  storeName: string;
  website: string;
  openTime: Date;
  closeTime: Date;

  constructor() {
    this.storeAddress = null;
    this.storeName = null;
    this.website = null;
    this.openTime = new Date();
    this.closeTime = new Date();
  }
}
