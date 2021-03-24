import { Router } from '@angular/router';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '@app/modules/common/base-list-component';
import { Order } from '../../model/order';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzImage, NzImageService } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent extends BaseListComponent<Order> implements OnInit {
  filterState = [
    { text: 'PENDING', value: 'PENDING' },
    { text: 'DELIVER', value: 'DELIVER' },
    { text: 'COMPLETE', value: 'COMPLETE' },
    { text: 'CANCEL', value: 'CANCEL' },
  ];
  constructor(
    private readonly orderService: OrderService,
    private readonly nzImageService: NzImageService,
    private readonly router: Router
  ) {
    super(orderService);
  }

  ngOnInit(): void {
  }

  searchByName() {
    this.baseParams.filters = [{ key: "customerName", value: this.searchValue }];
    super.search();
  }

  onQueryParamsChange = (params: NzTableQueryParams) => {
    this.baseParams.filters = [{ key: "customerName", value: this.searchValue }];
    super.onQueryParamsChangeFromParent(params);
  }

  showQrCode(qrCodeUrl: string) {
    let listNzImages: NzImage[] = [];
    listNzImages.push({
      src: qrCodeUrl
    });

    this.nzImageService.preview(listNzImages, { nzZoom: 1, nzRotate: 0 })
  }

  viewOrder(orderId: number) {
    this.router.navigate(['/admin/order/detail', orderId]);
  }

}
