import { CartService } from './../../../core/services/cart/cart.service';
import { CartRequest } from '../../../core/model/cart/cart-request';
import { Router } from '@angular/router';
import { Color } from '@core/model/color/color';
import { Size } from '@core/model/size/size';
import { ShareService } from './../../../core/services/share/share.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { Product } from '../../../core/model/product/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductImage } from '@core/model/product/product-image';
import { getListColor, getListSize } from '@core/model/product/product-helper';
import { getProductDetailId } from '@core/model/cart/cart-helper';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit {
  @ViewChild('productImages', { static: false }) private productImages: NzCarouselComponent;
  isVisible = false;
  listProductImage: string[] = [];
  listSize: Size[] = [];
  listColor: Color[] = [];
  colorSelected: Color;
  sizeSelected: Size;
  product: Product;
  isAddingToCart = false;
  quantity = 1;
  customOptions: OwlOptions = {
    loop: false,
    autoplay: true,
    dots: false,

    responsive: {
      400: {
        items: 1
      }
    },
    nav: true,
    navText: ['<', '>']
  }

  constructor(
    private readonly shareService: ShareService,
    private readonly router: Router,
    private readonly cartService: CartService
  ) { }

  ngOnInit(): void {
    this.shareService.openQuickViewEmitted$.subscribe((product) => {
      this.product = product;
      this.isVisible = true;
      this.listSize = getListSize(product.productDetails);
      this.listColor = getListColor(product.productDetails);
      this.colorSelected = this.listColor[0];
      this.sizeSelected = this.listSize[0];
      this.setImages(product.productImages);
    })
  }

  setImages(productImage: ProductImage[]) {
    this.listProductImage = productImage.map(x => x.image);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  prev() {
    this.productImages.pre();
  }

  next() {
    this.productImages.next();
  }

  viewDetail(id: number) {
    this.isVisible = false;
    this.router.navigate(['/product/detail', id]);
  }

  colorSelectEvent(color: Color) {
    this.colorSelected = color;
  }

  sizeSelectEvent(size: Size) {
    this.sizeSelected = size;
  }

  addToCart() {
    const body: CartRequest = {
      productDetailId: getProductDetailId(this.product.productDetails, this.colorSelected.id, this.sizeSelected.id),
      quantity: this.quantity,
      price: this.product.price,
    }
    this.isAddingToCart = true;
    this.cartService.addToCart(body)
      .pipe(
        finalize(() => this.isAddingToCart = false)
      )
      .subscribe((res) => {
        if (res.isSuccessed) {
          this.isVisible = false;
          this.shareService.cartEmitEvent(res.data);
          this.shareService.openCartDrawerEvent();
        }
      })
  }


}
