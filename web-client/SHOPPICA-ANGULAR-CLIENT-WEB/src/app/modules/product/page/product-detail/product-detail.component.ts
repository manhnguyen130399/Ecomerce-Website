import { CartRequest } from './../../../../core/model/cart/cart-request';
import { LoaderService } from './../../../../shared/modules/loader/loader.service';
import { finalize } from 'rxjs/operators';
import { ProductService } from './../../../../core/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../../../../core/model/product/product';
import { Component, OnInit } from '@angular/core';
import { getProductDetailId } from '@core/model/cart/cart-helper';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: number;
  product: Product;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(pa => {
      this.productId = pa.productId;
      this.loaderService.showLoader('productDetail');
      this.productService.getProductById(this.productId).pipe(
        finalize(() => this.loaderService.hideLoader('productDetail'))
      ).subscribe(res => {
        if (res.code == "OK") {
          this.product = res.data;
        }
      })
    });
  }

  listProduct: Product[] = [

  ]

  customOptions: OwlOptions = {
    loop: false,
    autoplay: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      400: {
        items: 2
      },
      600: {
        items: 3
      },
      768: {
        items: 4
      }
    },
    nav: true,
    navText: ['<', '>']
  }


}
