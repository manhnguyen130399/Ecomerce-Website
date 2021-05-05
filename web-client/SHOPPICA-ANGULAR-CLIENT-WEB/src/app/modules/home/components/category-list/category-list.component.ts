import { Category } from '../../../../core/model/category/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categoryList: Category[] = [
    {
      id: 1,
      categoryName: 'Women',
      image: '/assets/images/categories/women.jpg',

    },
    {
      id: 2,
      categoryName: 'Bag',
      image: '/assets/images/categories/bag.jpg',
    },
    {
      id: 3,
      categoryName: 'Shoes',
      image: '/assets/images/categories/shoes.jpg',
    },
    {
      id: 4,
      categoryName: 'Watch',
      image: '/assets/images/categories/watch.jpg',
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
