import { Router } from '@angular/router';
import { ProductImage } from './../../model/product-image';
import { ProductSearch } from './../../model/product-search';
import { BaseParams } from './../../../common/base-params';
import { finalize } from 'rxjs/operators';
import { BrandService } from './../../../brand/services/brand.service';
import { CategoryService } from './../../../category/services/category.service';
import { Category } from './../../../category/models/category';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '@app/modules/common/base-list-component';
import { Product } from '../../model/product';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Brand } from '@app/modules/brand/models/brand';
import { NumberFormatStyle } from '@angular/common';
import { NzImage, NzImageService } from 'ng-zorro-antd/image';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseListComponent<Product> implements OnInit {

  listCategory: Category[];
  listBrand: Brand[];
  isLoadCategory = false;
  isLoadBrand = false;
  filterParams = new BaseParams();
  productSearch = new ProductSearch();
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
    private readonly nzImageService: NzImageService,
    private readonly router: Router,

  ) {
    super(productService);

  }
  selectedValue = null;

  ngOnInit(): void {
  }

  searchByName() {
    this.baseParams.filters = [{ key: "productName", value: this.searchValue }];
    super.search();
  }

  onQueryParamsChange = (params: NzTableQueryParams) => {
    this.baseParams.filters = [{ key: "productName", value: this.searchValue }];
    super.onQueryParamsChangeFromParent(params);
  }

  focusCategorySelect() {
    if (!this.listCategory) {
      this.filterParams.pageSize = 50;
      this.isLoadCategory = true;
      this.categoryService.getAll(this.filterParams).pipe(
        finalize(() => this.isLoadCategory = false)
      )
        .subscribe(res => {
          if (res.code == "OK") {
            this.listCategory = res.data.content;
          }
        })
    }
  }

  focusBrandSelect() {
    if (!this.listBrand) {
      this.filterParams.pageSize = 50;
      this.isLoadBrand = true;
      this.brandService.getAll(this.filterParams).pipe(
        finalize(() => this.isLoadBrand = false)
      )
        .subscribe(res => {
          if (res.code == "OK") {
            this.listBrand = res.data.content;
          }
        })
    }
  }

  filterByCategory(categoryName: string) {
    this.productSearch.categoryName = categoryName;
    this.isLoading = true;
    this.productService.getAll(this.baseParams, this.productSearch).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(response => {
      this.listData = response.data.content;
      this.total = response.data.totalElements;
    });
  }

  filterByBrand(brandName: string) {
    this.productSearch.brandName = brandName;
    this.isLoading = true;
    this.productService.getAll(this.baseParams, this.productSearch).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(response => {
      this.listData = response.data.content;
      this.total = response.data.totalElements;
    });
  }

  showListImage(listImages: ProductImage[]) {
    let listNzImages: NzImage[] = [];
    listImages.forEach(item => {
      listNzImages.push({
        src: item.image
      });
    })

    this.nzImageService.preview(listNzImages, { nzZoom: 1, nzRotate: 0 })
  }

  editProduct(product: Product) {
    this.router.navigate(['/admin/product/detail', product.id]);
  }

}
