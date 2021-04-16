import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  discount = {
    percent: 15,
    expire: new Date(),

  }

  listDiscount = [
    this.discount,
    this.discount,
    this.discount,
    this.discount,
    this.discount,
  ]

  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      100: {
        items: 1
      },
      700: {
        items: 2
      },
      1050: {
        items: 3
      }
    },
    nav: true,
    navText: ['<', '>']
  }

}
