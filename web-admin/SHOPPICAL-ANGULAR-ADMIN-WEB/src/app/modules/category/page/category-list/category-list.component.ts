import { Component, OnInit } from '@angular/core';
import { Category } from '@modules/category/models/category';
import { CategoryService } from '@modules/category/services/category.service';
import { BaseListComponent } from '@app/modules/common/base-list-component';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { UtilitiesService } from '@app/core/services/utilities/utilities.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent extends BaseListComponent<Category> implements OnInit {

  constructor(private readonly categoryService: CategoryService, private readonly utilitiesService: UtilitiesService) {
    super(categoryService);
  }

  ngOnInit(): void {
    this.isAdmin = this.utilitiesService.getRole() === 'Admin';
  }

  searchByName() {
    this.baseParams.filters = [{ key: "categoryName", value: this.searchValue }];
    super.search();
  }

  onQueryParamsChange = (params: NzTableQueryParams) => {
    this.baseParams.filters = [{ key: "sizeName", value: this.searchValue }];
    super.onQueryParamsChangeFromParent(params);
  }

}
