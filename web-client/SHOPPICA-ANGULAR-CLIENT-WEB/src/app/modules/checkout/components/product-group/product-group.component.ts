import { Component, OnInit, Input } from '@angular/core';
import { CartGroup } from '@core/model/cart/cart-group';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.css']
})
export class ProductGroupComponent implements OnInit {

  visible: boolean = false;

  @Input() cartGroup: CartGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
