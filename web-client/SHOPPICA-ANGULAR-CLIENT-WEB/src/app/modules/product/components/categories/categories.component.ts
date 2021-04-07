import { Category } from '@core/model/category';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input() listCategory: Category[] = [];
  @Input() selectedId: number;
  @Output() selectCategoryEvent = new EventEmitter<Category>();
  constructor() { }

  ngOnInit(): void {
  }

  selectCategory(category: Category) {
    this.selectCategoryEvent.emit(category);
  }

}
