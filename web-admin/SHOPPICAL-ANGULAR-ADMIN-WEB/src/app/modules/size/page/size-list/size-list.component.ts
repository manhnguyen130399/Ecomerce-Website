import { BaseList } from './../../../BaseList';
import { finalize } from 'rxjs/operators';
import { SizeService } from './../../services/size.service';
import { Component, OnInit } from '@angular/core';
import { Size } from '../../models/size';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-size-list',
  templateUrl: './size-list.component.html',
  styleUrls: ['./size-list.component.css']
})
export class SizeListComponent extends BaseList implements OnInit {
  listSize: Size[] = [];
  selectedSize: Size;

  constructor(
    private readonly sizeService: SizeService) {
    super();
  }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex - 1, this.pageSize, null, null, []);
  }

  editSize(data) {
    this.selectedSize = data;
    this.isShowModal = true;
  }

  deleteSize(data: Size) {
    this.isLoading = true;
    this.sizeService.deleteSize(data.id).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      if (res.code == "OK") {
        this.listSize = this.listSize.filter(value => value.id !== data.id)
      }
      console.log(this.listSize);
    })
  }

  searchBySizeName() {
    this.loadDataFromServer(this.pageIndex - 1, this.pageSize, null, null, [{ key: "sizeName", value: this.searchValue }])
  }

  loadDataFromServer(pageIndex: number, pageSize: number, sortField: string, sortOrder: string, search: Array<{ key: string; value: string }>): void {
    this.isLoading = true;
    this.sizeService.getSizes(pageIndex, pageSize, sortField, sortOrder, search).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(response => {
      this.listSize = response.data.content,
        this.total = response.data.totalElements
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex - 1, pageSize, sortField, sortOrder, [{ key: "sizeName", value: this.searchValue }]);
  }
}
