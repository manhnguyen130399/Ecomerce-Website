import { CartItem } from './../../../core/model/cart-item';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-drawer',
  templateUrl: './shopping-cart-drawer.component.html',
  styleUrls: ['./shopping-cart-drawer.component.css']
})
export class ShoppingCartDrawerComponent implements OnInit {

  @Input() isOpenShoppingCartDrawer: boolean = false;
  @Output() closeShoppingCartDrawerEvent = new EventEmitter<boolean>();
  isLoading = false;
  totalPrice: number = 123213;
  listCartItem: CartItem[] = [
    {
      productId: 1,
      productName: "T-shirt product",
      price: 99,
      productImage: '/assets/images/products/product-2.jpg',
      quantity: 12,
    },
    {
      productId: 2,
      productName: "T-shirt product",
      price: 99,
      productImage: '/assets/images/products/product-3.jpg',
      quantity: 12,
    },
    {
      productId: 3,
      productName: "T-shirt Top",
      price: 99,
      productImage: '/assets/images/products/product-1.jpg',
      quantity: 12,
    }
  ]
  constructor(
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  closeMenu(): void {
    this.closeShoppingCartDrawerEvent.emit(false);
  }

  deleteItem(productId: number) {
    this.listCartItem = this.listCartItem.filter(c => c.productId != productId);
  }
}
