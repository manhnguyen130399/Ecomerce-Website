import { environment } from '@env';
import { GhnService } from '@core/services/ghn/ghn.service';
import { Address } from '@core/model/address/address';
import { StorageService } from './../../../../../core/services/storage/storage.service';
import { Customer } from '@core/model/user/customer';
import { AuthService } from '@core/services/auth/auth.service';
import { JwtService } from './../../../../../core/services/jwt/jwt.service';
import { StoreService } from '@core/services/store/store.service';
import { ProductDetail } from '@core/model/product/product-detail';
import { Size } from '@core/model/size/size';
import { Color } from '@core/model/color/color';
import { Product } from '@core/model/product/product';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Store } from '@core/model/store/store';
import { tap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail-summary',
  templateUrl: './product-detail-summary.component.html',
  styleUrls: ['./product-detail-summary.component.css']
})
export class ProductDetailSummaryComponent implements OnInit {

  @Input() product: Product;
  store: Store;
  userAddress: Address;
  storeAddress: Address;
  listColor: Color[] = [];
  listSize: Size[] = [];
  listObservable: Observable<any>[] = [];
  date = new Date();
  shippingFee: number;

  constructor(
    private readonly storeService: StoreService,
    private readonly ghnService: GhnService,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product !== undefined) {
      this.listSize = this.getListSize(changes.product.currentValue.productDetails);
      this.listColor = this.getListColor(changes.product.currentValue.productDetails);


      this.listObservable.push(this.storeService.getStoreById(changes.product.currentValue.storeId))
      if (this.authService.isAuthenticated()) {
        this.listObservable.push(this.authService.getUserById());
      }
      forkJoin(this.listObservable)
        .subscribe(res => {
          if (res[0].code === "OK") {
            this.storeAddress = JSON.parse(res[0].data.address);
            this.store = res[0].data;
            if (res[1] && res[1].isSuccessed) {
              this.userAddress = res[1].data.address;
              this.calculateShippingFee();
            }
          }
        })
    }
  }

  calculateShippingFee() {
    if (this.userAddress && this.storeAddress) {
      this.ghnService.calculateShippingFee(this.userAddress.districtId, this.storeAddress.districtId)
        .subscribe(res => {
          if (res.code == 200) {
            this.shippingFee = res.data.total / environment.USDToVND;
          }
        });

    }
  }

  getListSize(productDetails: ProductDetail[]) {
    let distinctSizes = new Set<string>();
    productDetails.forEach(element => {
      const size: Size = {
        id: element.sizeId,
        sizeName: element.size,
      }
      distinctSizes.add(JSON.stringify(size));
    });

    return [...distinctSizes].map(x => JSON.parse(x));
  }

  getListColor(productDetails: ProductDetail[]) {
    let distinctColors = new Set<string>();
    productDetails.forEach(element => {
      const color: Color = {
        id: element.colorId,
        colorName: element.color,
        colorCode: element.colorHex
      }
      distinctColors.add(JSON.stringify(color));
    });

    return [...distinctColors].map(x => JSON.parse(x));
  }

  cartItem = {
    id: 1,
    productName: "Cream women pants",
    price: 35,
    image: "/assets/images/products/product-4.jpg",
    quantity: 1
  }
}
