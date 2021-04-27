import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { ShareService } from '@core/services/share/share.service';
import { Promotion } from '@core/model/promotion';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {

  constructor(private readonly shareService: ShareService) { }

  listDiscount: Promotion[];
  ngOnInit(): void {
    this.shareService.loadStoreInfoSEmitted$.subscribe((it) => {
      this.listDiscount = it.promotions
    })
  }

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
