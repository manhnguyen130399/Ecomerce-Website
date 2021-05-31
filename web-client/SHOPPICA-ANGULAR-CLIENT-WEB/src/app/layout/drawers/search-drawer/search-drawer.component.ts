import { CartItemOptions } from '@shared/modules/cart-item/models/cart-item-options.model';
import { CartItem } from '@core/model/cart/cart-item';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-drawer',
  templateUrl: './search-drawer.component.html',
  styleUrls: ['./search-drawer.component.css']
})
export class SearchDrawerComponent implements OnInit {
  @Input() isOpenSearchDrawer = false;
  @Output() closeSearchDrawerEvent = new EventEmitter<boolean>();
  searchForm: FormGroup;
  isLoading = false;

  listCartItem: CartItem[] = [
    {
      id: 1,
      productName: 'T-shirt product',
      price: 99,
      image: 'assets/images/products/product-2.jpg',
      quantity: 12,
    },
    {
      id: 2,
      productName: 'T-shirt product',
      price: 99,
      image: 'assets/images/products/product-3.jpg',
      quantity: 12,
    },
    {
      id: 3,
      productName: 'T-shirt Top',
      price: 99,
      image: 'assets/images/products/product-1.jpg',
      quantity: 12,
    },
    {
      id: 4,
      productName: 'T-shirt Top',
      price: 99,
      image: 'assets/images/products/product-1.jpg',
      quantity: 12,
    }
  ];
  cartItemOptions: CartItemOptions = {
    showPrice: true,
    size: 'small'
  };
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
    });
  }

  closeMenu(): void {
    this.closeSearchDrawerEvent.emit(false);
  }
}
