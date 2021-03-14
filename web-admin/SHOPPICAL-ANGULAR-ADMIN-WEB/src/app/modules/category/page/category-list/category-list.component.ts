import { Component, OnInit } from '@angular/core';
import { Category } from '@modules/category/models/category';
import { CategoryService } from '@modules/category/services/category.service';
import { BaseList } from '@modules/common/base-list';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent extends BaseList<Category> implements OnInit {

  constructor(private readonly categoryService: CategoryService) {
    super(categoryService);
  }

  ngOnInit(): void {
  }

}
