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
  isLoading: boolean = true;
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

  constructor(private readonly storeService: ShareService, private readonly productService: ProductService) {
    this.storeService.loadStoreInfoSEmitted$.subscribe((res) => {
      this.storeId = res
    })

  }

  ngOnInit(): void {
    this.getProductBestSellerByStore(this.storeId);
  }

  getProductBestSellerByStore(id: number) {
    this.productService.getProductBestSellerByStore(id).pipe(finalize(() => this.isLoading = false)).subscribe((res) => {
      this.listProduct = res.data;
    })
  }

}
