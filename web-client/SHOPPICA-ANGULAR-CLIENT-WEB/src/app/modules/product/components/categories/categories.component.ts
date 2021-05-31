import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../../core/services/category/category.service';
import { Category } from '@core/model/category/category';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  listCategory: Category[] = [];
  categorySelected: Category;
  currentCategory: string;
  constructor(
    private readonly categoryService: CategoryService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getListCategory();

    this.activatedRoute.params.subscribe((params) => {
      this.currentCategory = params.category;
    });
  }

  selectCategory(category: Category) {
    this.categorySelected = category;
  }

  getListCategory() {
    this.categoryService.getAllCategory().subscribe((res) => {
      if (res.code === 'OK') {
        this.listCategory = [
          {
            id: -1,
            categoryName: 'All',
            image: 'assets/images/blogs/blog-background.jpg'
          },
          ...res.data
        ];
        this.categorySelected = this.listCategory.find(x => x.categoryName.toLowerCase() === this.currentCategory);
      }
    });
  }
}
