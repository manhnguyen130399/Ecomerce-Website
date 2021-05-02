import { ShareService } from './../../../../core/services/share/share.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from '@core/model/cart/cart-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(
    private readonly shareService: ShareService
  ) { }

  ngOnInit(): void {
    this.shareService.changeGotoCartPage(true);
  }

  showShoppingCartDrawer() {
    this.shareService.changeGotoCartPage(false);
  }

}
