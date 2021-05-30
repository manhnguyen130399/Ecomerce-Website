import { LoaderService } from './../../../../shared/modules/loader/loader.service';
import { Brand } from './../../../../core/model/brand/brand';
import { ProductSort } from './../../../../core/model/product/product-sort';
import { delay, finalize, switchMap, tap } from 'rxjs/operators';
import { ProductService } from './../../../../core/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductOptions } from './../../../../core/model/product/product-option';
import { BaseParams } from '@core/model/base-params';
import { Category } from '@core/model/category/category';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Product } from '@core/model/product/product';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { stringify } from '@angular/compiler/src/util';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('target') targetScrollTo: ElementRef;
  isShowFilter = false;
  productCol: number;
  baseParams: BaseParams = new BaseParams(0, 12);
  productOptions: ProductOptions = new ProductOptions();
  listProduct: Product[] = [];
  total = 0;
  countFilter = 0;
  loaded = true;

  selectedColor: string;
  selectedSize: string;
  selectedBrand: string;
  selectedPrice: string;
  currentCategory: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly router: Router,
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit(): void {

    combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.queryParams
    ])
      .pipe(
        switchMap((data) => {
          this.getCategory(data[0]);
          this.getFilter(data[1]);
          this.loaderService.showLoader('product');
          this.loaded = false;
          return this.productService.getListProduct(this.productOptions, this.baseParams);
        }),
      ).subscribe(res => {
        if (res.code === 'OK') {
          this.listProduct = res.data.content;
          this.total = res.data.totalElements;
        }
        this.loaderService.hideLoader('product');
        this.loaded = true;
      });

    if (window.innerWidth <= 992) {
      this.productCol = 12;
    }
    else {
      this.productCol = 6;
    }
  }

  getCategory(params) {
    this.currentCategory = params.category;
    this.productOptions.categoryNames = params.category === 'all' ? null : params.category;
  }

  getFilter(queryParams) {
    this.countFilter = Object.keys(queryParams).length;
    if (!queryParams.size && !queryParams.color && !queryParams.brand && !queryParams.price) {
      this.clearFilter();
      return;
    }
    if (queryParams.color) {
      this.selectedColor = queryParams.color;
      this.productOptions.colorNames = [queryParams.color];
    }
    if (queryParams.size) {
      this.selectedSize = queryParams.size;
      this.productOptions.sizeNames = [queryParams.size];
    }
    if (queryParams.brand) {
      this.selectedBrand = queryParams.brand;
      this.productOptions.brandNames = [queryParams.brand];
    }
    if (queryParams.price) {
      console.log(queryParams)
      this.selectedPrice = queryParams.price;
      this.productOptions.prices = queryParams.price.split('-');
    }
  }

  openFilterDrawer() {
    this.isShowFilter = true;
  }

  closeFilterDrawer() {
    this.isShowFilter = false;
  }

  changeNumProduct(numProduct: number) {
    this.productCol = 24 / numProduct;
  }

  loadListProduct() {
    this.loaderService.showLoader('product');
    this.productService.getListProduct(this.productOptions, this.baseParams).pipe(
      finalize(() => this.loaderService.hideLoader('product'))
    ).subscribe(res => {
      if (res.code === 'OK') {
        this.listProduct = res.data.content;
        this.total = res.data.totalElements;
      }
    });
  }

  changePageIndex(page: number) {
    this.baseParams.pageIndex = page - 1;
    this.targetScrollTo.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    this.loadListProduct();
  }

  sortChangeValue(value: ProductSort) {
    this.productOptions.sortType = value;
    this.loadListProduct();
  }

  clearAllFilter() {
    this.router.navigate(['/product/collection', this.currentCategory]);
    this.clearFilter();
  }

  clearFilter() {
    this.productOptions.colorNames = [];
    this.productOptions.sizeNames = [];
    this.productOptions.brandNames = [];
    this.productOptions.prices = [];
    this.selectedBrand = '';
    this.selectedColor = '';
    this.selectedSize = '';
    this.selectedPrice = '';
  }

  clearSize() {
    this.router.navigate(['/product/collection', this.currentCategory], {
      queryParams: {
        size: null,
      },
      queryParamsHandling: 'merge'
    });
    this.productOptions.sizeNames = [];
    this.selectedSize = '';
  }

  clearColor() {
    this.router.navigate(['/product/collection', this.currentCategory], {
      queryParams: {
        color: null,
      },
      queryParamsHandling: 'merge'
    });
    this.productOptions.colorNames = [];
    this.selectedColor = '';
  }

  clearBrand() {
    this.router.navigate(['/product/collection', this.currentCategory], {
      queryParams: {
        Brand: null,
      },
      queryParamsHandling: 'merge'
    });
    this.productOptions.brandNames = [];
    this.selectedBrand = '';
  }

  clearPrice() {
    this.router.navigate(['/product/collection', this.currentCategory], {
      queryParams: {
        price: null,
      },
      queryParamsHandling: 'merge'
    });
    this.productOptions.prices = [];
    this.selectedPrice = '';
  }

}
