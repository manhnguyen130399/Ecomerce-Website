import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-quantity',
  templateUrl: './input-quantity.component.html',
  styleUrls: ['./input-quantity.component.css']
})
export class InputQuantityComponent implements OnInit {

  @Input() quantity: number;
  @Output() quantityChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  increaseOne() {
    this.quantity++;
  }

  decreaseOne() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  focusOut() {
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }
}
