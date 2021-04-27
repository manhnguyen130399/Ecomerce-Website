import { finalize } from 'rxjs/operators';
import { ProductService } from './../../../../core/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../../../../core/model/product/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: number;
  product: Product;
  isLoading = true;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(pa => {
      this.productId = pa.productId;
      this.isLoading = true;
      this.productService.getProductById(this.productId).pipe(
        finalize(() => this.isLoading = false)
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
