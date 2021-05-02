import { LoaderService } from '@shared/modules/loader/loader.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { ShareService } from '@core/services/share/share.service';
import { Promotion } from '@core/model/promotion';
import { StoreService } from '@core/services/store/store.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {

  storeId: number;
  listDiscount: Promotion[];

  constructor(
    private readonly shareService: ShareService,
    private readonly storeService: StoreService,
    private readonly loaderService: LoaderService
  ) {
    this.shareService.loadStoreInfoSEmitted$.subscribe((it) => {
      this.storeId = it
    })
  }

  ngOnInit(): void {
    this.loadDataPromotionDataByStore();
  }

  loadDataPromotionDataByStore() {
    this.loaderService.showLoader('store');
    this.storeService.getStoreById(this.storeId)
      .pipe(finalize(() => this.loaderService.hideLoader('store')))
      .subscribe((res) => {
        this.listDiscount = res.data.promotions
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
