import { finalize } from 'rxjs/operators';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Order } from '../../model/order';
import { Address } from '@app/modules/profile/model/address';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderId: number;
  order: Order;
  orderDetails = [];
  isLoading = false;
  isHaveOrder = true;
  constructor(
    private readonly messageService: NzMessageService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly orderService: OrderService,
  ) {
  }

  ngOnInit(): void {

    this.orderId = this.activatedRoute.snapshot.params.id;
    if (this.orderId !== undefined) {
      this.isLoading = true;
      this.orderService.getOrderDetails(this.orderId)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe(res => {
          if (res.isSuccessed) {
            this.order = res.data;
            this.order.created_at = new Date(res.data.created_at);
            this.orderDetails = this.order.orderDetails;
          }
          else {
            this.isHaveOrder = false;
          }
        }
        )
    }
  }

  updateState(orderId: number, state: string) {
    this.orderService.updateState(orderId, state).subscribe(res => {
      if (res.isSuccessed) {
        this.messageService.success("update state successfully");
      }
    })
  }

}
