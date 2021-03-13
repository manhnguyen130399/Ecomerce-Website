import { Component, OnInit } from '@angular/core';
import { BaseList } from '@app/modules/BaseList';
import { finalize } from 'rxjs/operators';
import { Color } from '../../models/Color';
import { ColorService } from '../../services/color.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css'],
})
export class ColorListComponent extends BaseList implements OnInit {
  listColor: Color[] = [];

  selectedColor: Color;

  constructor(private readonly colorService: ColorService) {
    super();
  }

  ngOnInit(): void {
    this.loadDataFromServer(
      this.pageIndex - 1,
      this.pageSize,
      null,
      null,
      null
    );
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    colorName: string,
    sortField: string,
    sortOrder: string
  ) {
    this.colorService
      .getColors(pageIndex, pageSize, colorName, sortField, sortOrder)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((res) => {
        this.listColor = res.data.content;
        this.total = res.data.totalElements;
      });
  }

  deleteColor(color: Color) {
    const colorId = color.id;
    this.colorService
      .deleteColor(colorId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((res) => {
        if (res.code == 'OK') {
          this.listColor = this.listColor.filter((it) => it.id !== colorId);
        }
      });
  }

  searchByColorName() {
    this.loadDataFromServer(
      this.pageIndex - 1,
      this.pageSize,
      this.searchValue,
      null,
      null
    );
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(
      pageIndex - 1,
      pageSize,
      this.searchValue,
      sortField,
      sortOrder
    );
  }
}
