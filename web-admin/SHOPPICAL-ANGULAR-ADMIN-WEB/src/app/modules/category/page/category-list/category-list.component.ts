import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BaseList } from '@app/modules/BaseList';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent extends BaseList implements OnInit {
  listCategory: Category[] = [];
  selectedCategory: Category;
  constructor(private readonly categoryService: CategoryService) {
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

  deleteCategory(data: Category) {
    this.isLoading = true;
    this.categoryService
      .deleteCategory(data.id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((res) => {
        if ((res.code = 'OK')) {
          this.listCategory = this.listCategory.filter(
            (it) => it.id !== data.id
          );
        }
      });
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortOrder: string,
    categoryName: string
  ): void {
    this.isLoading = true;
    this.categoryService
      .getCategories(pageIndex, pageSize, categoryName, sortField, sortOrder)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((response) => {
        (this.listCategory = response.data.content),
          (this.total = response.data.totalElements);
      });
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(
      pageIndex - 1,
      pageSize,
      sortField,
      sortOrder,
      this.searchValue
    );
  }
  searchByCategoryName() {
    this.loadDataFromServer(
      this.pageIndex - 1,
      this.pageSize,
      null,
      null,
      this.searchValue
    );
  }
}
