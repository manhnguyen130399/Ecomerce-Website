import { Router } from '@angular/router';
import { CheckoutService } from '@core/services/checkout/checkout.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-order-steps',
  templateUrl: './order-steps.component.html',
  styleUrls: ['./order-steps.component.css']
})
export class OrderStepsComponent implements OnInit {
  index = 0;
  maxIndex = 0;
  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.checkoutService.stepEmitted$.subscribe((step: number) => {
      this.index = step;
      this.maxIndex = this.maxIndex <= step ? step : this.maxIndex;
    });
  }

  onIndexChange(event: number): void {
    this.index = event;
    switch (event) {
      case 0:
        this.router.navigate(['/cart']);
        break;
      case 1:
        this.router.navigate(['/checkout/information']);
        break;
      case 2:
        this.router.navigate(['/checkout/payment']);
        break;
    }
  }
}
