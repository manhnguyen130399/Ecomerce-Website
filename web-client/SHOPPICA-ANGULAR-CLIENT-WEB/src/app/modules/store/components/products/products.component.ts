import { LoaderService } from '@shared/modules/loader/loader.service';
import { Product } from '../../../../core/model/product/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShareService } from '@core/services/share/share.service';
import { ProductService } from '@core/services/product/product.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() fullScreen: boolean;
  selectedIndex = 0;
  storeId: number;
  pageIndex = 1;
  pageSize = 4;
  listProduct: Product[];
  constructor(
    private readonly shareService: ShareService,
    private readonly productService: ProductService,
    private readonly loaderService: LoaderService
  ) {
    this.shareService.loadStoreInfoSEmitted$.subscribe((it) => {
      this.storeId = it;
    });
  }

  ngOnInit(): void {
    this.loadProductByStore('descend', null);
  }

  loadProductByStore(sortOrder: string, categoryName: string) {
    const body = {
      storeId: this.storeId,
      productName: null,
      price: null,
      brandName: '',
      categoryName: null,
      sortOrder,
      sortField: 'price'
    };
    this.productService.getProductByStore(this.pageIndex, this.pageSize, body)
      .pipe(finalize(() => this.loaderService.hideLoader('store')))
      .subscribe((res) => {
        this.listProduct = res.data.content;
      });
  }

  loadProduct(id: number) {
    this.selectedIndex = id;
    this.loaderService.showLoader('store');
    const isMore = id == 4;
    if (isMore) {
      this.pageSize = this.pageSize * 2;
    }
    this.loadProductByStore(id == 3 ? 'ascend' : 'descend', null);
  }
}
