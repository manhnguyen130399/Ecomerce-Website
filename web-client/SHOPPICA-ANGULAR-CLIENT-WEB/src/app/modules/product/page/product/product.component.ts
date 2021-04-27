import { Brand } from './../../../../core/model/brand/brand';
import { ProductSort } from './../../../../core/model/product/product-sort';
import { finalize } from 'rxjs/operators';
import { ProductService } from './../../../../core/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductOptions } from './../../../../core/model/product/product-option';
import { BaseParams } from '@core/model/base-params';
import { Category } from '@core/model/category/category';
import { Component, OnInit } from '@angular/core';
import { Product } from '@core/model/product/product';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  isShowFilter = false;
  isLoading = false;
  productCol: number;
  baseParams: BaseParams = new BaseParams(0, 12);
  productOptions: ProductOptions = new ProductOptions();
  listProduct: Product[] = [];
  total: number = 0;
  countFilter = 0;

  selectedColor: string;
  selectedSize: string;
  selectedBrand: string;
  selectedPrice: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.productOptions.categoryNames = data.category === "all" ? null : data.category;
      this.loadListProduct();
    })

    this.activatedRoute.queryParams.subscribe(params => {
      this.countFilter = Object.keys(params).length;
      if (params.color) {
        this.selectedColor = params.color;
        this.productOptions.colorNames = [params.color];
      }
      if (params.size) {
        this.selectedSize = params.size;
        this.productOptions.sizeNames = [params.size]
      }
      if (params.brand) {
        this.selectedBrand = params.brand;
        this.productOptions.brandNames = [params.brand];
      }
      if (params.price) {
        this.selectedPrice = params.price;
        this.productOptions.prices = params.price.split("-");
      }
      this.loadListProduct();
    });

    if (window.innerWidth <= 992) {
      this.productCol = 12;
    }
    else {
      this.productCol = 6;
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
    this.isLoading = true;
    this.productService.getListProduct(this.productOptions, this.baseParams).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      if (res.code === "OK") {
        this.listProduct = res.data.content;
        this.total = res.data.totalElements;
      }
    })
  }

  changePageIndex(page: number) {
    this.baseParams.pageIndex = page - 1;
    this.loadListProduct();
  }

  sortChangeValue(value: ProductSort) {
    this.productOptions.sortType = value;
    this.loadListProduct();
  }

  clearAllFilter() {
    this.router.navigate(['/product/collection/all']);
    this.productOptions.colorNames = [];
    this.productOptions.sizeNames = [];
    this.productOptions.brandNames = [];
    this.productOptions.prices = [];
    this.selectedBrand = "";
    this.selectedColor = "";
    this.selectedSize = "";
    this.selectedPrice = "";
  }

  clearSize() {
    this.router.navigate(['/product/collection/all'], {
      queryParams: {
        size: null,
      },
      queryParamsHandling: 'merge'
    });
    this.productOptions.sizeNames = [];
    this.selectedSize = "";
  }

  clearColor() {
    this.router.navigate(['/product/collection/all'], {
      queryParams: {
        color: null,
      },
      queryParamsHandling: 'merge'
    });
    this.productOptions.colorNames = [];
    this.selectedColor = "";
  }

  clearBrand() {
    this.router.navigate(['/product/collection/all'], {
      queryParams: {
        Brand: null,
      },
      queryParamsHandling: 'merge'
    });
    this.productOptions.brandNames = [];
    this.selectedBrand = "";
  }

  clearPrice() {
    this.router.navigate(['/product/collection/all'], {
      queryParams: {
        price: null,
      },
      queryParamsHandling: 'merge'
    });
    this.productOptions.prices = [];
    this.selectedPrice = "";
  }

}
