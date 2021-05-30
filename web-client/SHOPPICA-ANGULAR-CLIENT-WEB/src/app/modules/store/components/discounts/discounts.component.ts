import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private readonly shareService: ShareService,
    private readonly storeService: StoreService,
    private readonly loaderService: LoaderService,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  storeId: number;
  listDiscount: Promotion[];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      400: {
        items: 3
      },
      600: {
        items: 3
      },
      768: {
        items: 4
      }
    },
    nav: true,
    navText: ['<', '>']
  };

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((param) => {
      this.storeId = param?.storeId;
    });
    this.loadDataPromotionDataByStore();
  }

  loadDataPromotionDataByStore() {
    this.storeService.getStoreById(this.storeId)
      .pipe()
      .subscribe((res) => {

        this.listDiscount = res.data.promotions;
        console.log(this.listDiscount);

      });
  }

}
