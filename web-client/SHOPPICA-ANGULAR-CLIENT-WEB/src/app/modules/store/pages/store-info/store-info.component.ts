import { LoaderService } from '@shared/modules/loader/loader.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareService } from '@core/services/share/share.service';
import { StoreInfoService } from '@core/services/store-info/store-info.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit {
  createdAt: Date;
  totalProduct: number;
  cancel = 0;
  complete = 0;
  storeId: number;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly storeService: StoreInfoService,
    private readonly loaderService: LoaderService
  ) {
    this.router.parent.params.subscribe(params => {
      this.storeId = params.storeId;
    });
  }

  ngOnInit(): void {
    this.getCancelAndCompleteOrderState(this.storeId);
    this.getStoreInfo(this.storeId);
  }

  getCancelAndCompleteOrderState(storeId: number) {
    this.storeService.getOrderState(storeId)
      .subscribe((res) => {
        const orderStates = res.data.orderStates;
        const sum = orderStates.reduce((a, { quantity }) => a + quantity, 0);
        this.complete = orderStates[2].quantity * 100 / sum;
        this.cancel = orderStates[3].quantity * 100 / sum;
      });
  }

  getStoreInfo(id: number) {
    this.storeService.getStoreInfoById(id).subscribe((res) => {
      this.createdAt = res.data.createdAt;
      this.totalProduct = res.data.totalProduct;
    });

  }
}
