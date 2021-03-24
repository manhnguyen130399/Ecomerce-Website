export class StoreRegister {
  storeName: string;
  website: string;
  openTime: Date;
  closeTime: Date;

  constructor() {
    this.storeName = null;
    this.website = null;
    this.openTime = new Date();
    this.closeTime = new Date();
  }
}
