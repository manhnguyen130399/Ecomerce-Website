import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '@shared/modules/loader/loader.service';
import { Product } from '../../../../core/model/product/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, Input, OnInit } from '@angular/core';
import { ShareService } from '@core/services/share/share.service';
import { ProductService } from '@core/services/product/product.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css']
})
export class BestSellerComponent implements OnInit {
  storeId: number;
  listProduct: Product[];
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    skip_validateItems: true,
    responsive: {
      200: {
        items: 1
      },
      300: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true,
    navText: ['<', '>']
  };

  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((param) => {
      this.storeId = param?.storeId;
    });
    this.getProductBestSellerByStore();
  }

  getProductBestSellerByStore() {
    this.productService.getProductBestSellerByStore(5, this.storeId)
      .subscribe((res) => {
        this.listProduct = res.data;
      });
  }

}
