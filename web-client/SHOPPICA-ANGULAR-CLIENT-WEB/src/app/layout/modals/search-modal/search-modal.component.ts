import { FormBuilder, FormGroup } from '@angular/forms';
import { CartItemOptions } from '@shared/modules/cart-item/models/cart-item-options.model';
import { CartItem } from '@core/model/cart-item';
import { Product } from '@core/model/product';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent implements OnInit {

  @Input() isVisible;
  @Output() closeSearchModalEvent = new EventEmitter();
  searchForm: FormGroup;

  product: Product = {
    id: 1,
    productName: "Ruby & Diamonds",
    image: "/assets/images/products/product-5.jpg",
    price: 12,
    sizes: [],
    colors: [],
  };

  listProduct: Product[] = [
    this.product,
    this.product,
    this.product,
    this.product,
    this.product,
    this.product,
  ]
  constructor(
    private readonly formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      categoryId: [null],
      productName: [null],
    })
  }

  handleCancel() {
    this.closeSearchModalEvent.emit();
  }

}
