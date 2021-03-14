import { BrandService } from './../../services/brand.service';
import { Brand } from './../../models/brand';
import { BaseList } from './../../../BaseList';
import { Component, OnInit } from '@angular/core';
import { SUPER_EXPR } from '@angular/compiler/src/output/output_ast';
import { finalize } from 'rxjs/operators';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent extends BaseList implements OnInit {
  listBrand: Brand[] = [];
  selectedBrand: Brand;

  constructor(
    private readonly brandService: BrandService) {
    super();
  }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex - 1, this.pageSize, null, null, []);
  }

  editBrand(data) {
    this.selectedBrand = data;
    this.isShowModal = true;
  }

  deleteSize(data: Brand) {
    this.isLoading = true;
    this.brandService.deleteBrand(data.id).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      if (res.code == "OK") {
        this.listBrand = this.listBrand.filter(value => value.id !== data.id)
      }
    })
  }

  searchByBrandName() {
    this.loadDataFromServer(this.pageIndex - 1, this.pageSize, null, null, [{ key: "brandName", value: this.searchValue }])
  }

  loadDataFromServer(pageIndex: number, pageSize: number, sortField: string, sortOrder: string, search: Array<{ key: string; value: string }>): void {
    this.isLoading = true;
    this.brandService.getBrands(pageIndex, pageSize, sortField, sortOrder, search).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(response => {
      console.log(response)
      this.listBrand = response.data.content,
        this.total = response.data.totalElements
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex - 1, pageSize, sortField, sortOrder, [{ key: "brandName", value: this.searchValue }]);
  }
}
