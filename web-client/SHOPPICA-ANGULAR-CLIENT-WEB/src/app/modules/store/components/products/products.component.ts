import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '@shared/modules/loader/loader.service';
import { Product } from '../../../../core/model/product/product';
import { Component, OnInit, Input, AfterContentInit, AfterViewInit, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { ShareService } from '@core/services/share/share.service';
import { ProductService } from '@core/services/product/product.service';
import { debounceTime, finalize, switchMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterContentInit {

  @Input() fullScreen: boolean;
  selectedIndex = 1;
  storeId: number;
  pageIndex = 1;
  pageSize = 8;
  currentSortField = "createdAt";
  currentSortOrder: 'descend' | 'ascend' = 'descend';
  currentCategory = "";
  listProduct: Product[];
  clickSubject = new Subject();
  clickSubjectEmitted = this.clickSubject.asObservable();
  hideLoadMoreBtn = false;
  constructor(
    private readonly productService: ProductService,
    private readonly loaderService: LoaderService,
    private readonly activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((param) => {
      this.storeId = param?.storeId;
    });

    this.activatedRoute.queryParams.pipe(
      debounceTime(500),
      switchMap(queryParams => {
        if (queryParams.category) {
          this.currentCategory = queryParams.category;
          return this.loadProductByStore();
        }
      })
    ).subscribe(res => {
      if (res.code == "OK") {
        this.listProduct = res.data.content;
        if (res.data.totalElements <= this.pageSize) {
          this.hideLoadMoreBtn = true;
        }
        this.loaderService.hideLoader('products-store');
      }
    })

    this.clickSubjectEmitted.pipe(
      debounceTime(500),
      switchMap(data => {
        return this.loadProductByStore();
      })
    ).subscribe(res => {
      if (res.code == "OK") {
        this.listProduct = res.data.content;
        if (res.data.totalElements <= this.pageSize) {
          this.hideLoadMoreBtn = true;
        }
        this.loaderService.hideLoader('products-store');
      }
    })
    this.clickSubject.next(true);
  }

  ngAfterContentInit() {
    this.loaderService.showLoader('products-store');
  }

  loadProductByStore() {
    const body = {
      storeId: this.storeId,
      productName: null,
      price: null,
      brandName: '',
      categoryName: this.currentCategory,
      sortOrder: this.currentSortOrder,
      sortField: this.currentSortField
    };
    this.loaderService.showLoader('products-store');
    return this.productService.getProductByStore(this.pageIndex, this.pageSize, body);
  }

  sortProduct(id: number) {
    switch (id) {
      case 1:
        this.selectedIndex = 1;
        this.currentSortField = "createdAt";
        this.currentSortOrder = "descend";
        this.loadProductByStore();
        break;
      case 2:
        this.selectedIndex = 2;
        this.currentSortField = "price";
        this.currentSortOrder = "descend";
        this.loadProductByStore();
        break;
      case 3:
        this.selectedIndex = 3;
        this.currentSortField = "createdAt";
        this.currentSortOrder = 'ascend';
        this.loadProductByStore();
        break;
      case 4:
        this.pageSize = this.pageSize * 2;
        this.loadProductByStore();
        break;
    }
    this.clickSubject.next(true);
  }
}
