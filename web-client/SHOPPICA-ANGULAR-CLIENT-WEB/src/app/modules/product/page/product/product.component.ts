import { Category } from '@core/model/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  isShowFilter = false;
  productCol: number;
  categorySelected: Category;
  listCategory: Category[] = [
    {
      id: 1,
      categoryName: "Shoes",
      image: "/assets/images/categories/shoes.jpg",
      isSelected: false
    },
    {
      id: 2,
      categoryName: "T-Shirt",
      image: "",
      isSelected: false
    },
    {
      id: 3,
      categoryName: "Jackets",
      image: "",
      isSelected: false
    },
    {
      id: 4,
      categoryName: "Dress",
      image: "",
      isSelected: false
    },
    {
      id: 5,
      categoryName: "Accessories",
      image: "",
      isSelected: false
    },
    {
      id: 8,
      categoryName: "Demin",
      image: "",
      isSelected: false
    },
    {
      id: 6,
      categoryName: "Women",
      image: "",
      isSelected: false
    },
    {
      id: 7,
      categoryName: "Men",
      image: "",
      isSelected: false
    },
  ]
  constructor() { }

  ngOnInit(): void {
    if (window.innerWidth <= 992) {
      this.productCol = 12;
    }
    else {
      this.productCol = 6;
    }


    this.getCategorySelected();
  }

  getCategorySelected() {
    const selected = this.listCategory.filter(x => x.isSelected);
    if (selected.length === 0) {
      this.selectCategory(this.listCategory[0]);
    }
    else {
      this.categorySelected = selected[0];
    }
  }

  selectCategory(category: Category) {
    this.listCategory.forEach(x => x.isSelected = false);
    category.isSelected = true;
    this.categorySelected = category;
  }

  openFilterDrawer() {
    this.isShowFilter = true;
  }

  closeFilterDrawer() {
    this.isShowFilter = false;
  }

  changeNumProduct(numProduct: number) {
    this.productCol = 24 / numProduct;
  }
}
