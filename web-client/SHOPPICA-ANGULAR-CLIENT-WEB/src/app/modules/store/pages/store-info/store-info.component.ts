import { Component, Input, OnInit } from '@angular/core';
import { ShareService } from '@core/services/share/share.service';
import { StoreInfoService } from '@core/services/store-info/store-info.service';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit {
  createdAt: Date;
  totalProduct: number;
  cancel: number = 0;
  complete: number = 0;
  storeId: number;

  constructor(private readonly shareService: ShareService, private readonly storeService: StoreInfoService) {
    this.shareService.loadStoreInfoSEmitted$.subscribe((res) => {
      this.createdAt = res.createdAt;
      this.totalProduct = res.totalProduct;
      this.getCancelAndCompleteOrderState(res.id);
    })
  }

  ngOnInit(): void {
  }

  getCancelAndCompleteOrderState(storeId: number) {
    this.storeService.getOrderState(storeId).subscribe((res) => {
      const orderStates = res.data.orderStates
      const sum = orderStates.reduce((a, { quantity }) => a + quantity, 0);
      this.complete = orderStates[2].quantity * 100 / sum;
      this.cancel = orderStates[3].quantity * 100 / sum;
    })
  }
}
