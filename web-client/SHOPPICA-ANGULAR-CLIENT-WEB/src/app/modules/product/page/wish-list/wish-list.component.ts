import { finalize } from 'rxjs/operators';
import { LoaderService } from './../../../../shared/modules/loader/loader.service';
import { ProductService } from '@core/services/product/product.service';
import { Product } from '@core/model/product/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  listProduct: Product[] = [];
  constructor(
    private readonly productService: ProductService,
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loaderService.showLoader('wishlist');
    this.productService.getWishList({ pageIndex: 0, pageSize: 12 })
      .pipe(
        finalize(() => this.loaderService.hideLoader('wishlist'))
      ).subscribe(res => {
        if (res.code == 'OK') {
          this.listProduct = res.data.content;
        }
      });
  }

  removeFromWishList(id: number) {
    this.listProduct = this.listProduct.filter(x => x.id !== id);
  }

}
