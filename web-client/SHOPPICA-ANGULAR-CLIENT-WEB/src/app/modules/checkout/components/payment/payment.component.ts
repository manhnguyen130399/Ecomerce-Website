import { NzMessageService } from 'ng-zorro-antd/message';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckoutService } from './../../../../core/services/checkout/checkout.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var paypal;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('paypal', { static: true }) private paypal: ElementRef;
  paymentMethodForm: FormGroup;
  showPaypal = false;
  hiddenCash = false;
  subtotal = 0;
  shippingPrice = 0;
  discount = 0;
  transactionId = '';
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly checkoutService: CheckoutService,
    private readonly messageService: NzMessageService
  ) { }


  buildForm() {
    this.paymentMethodForm = this.formBuilder.group({
      method: ['CASH', Validators.required]
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.paymentMethodForm.valueChanges.subscribe(value => {
      value.method === 'PAYPAL' ? this.showPaypal = true : this.showPaypal = false;
    });
    this.initPayment();

    this.checkoutService.productPriceEmitted$.subscribe((price: number) => {
      this.subtotal += price;
    });

    this.checkoutService.shippingPriceEmitted$.subscribe((shipping: number) => {
      this.shippingPrice += shipping;
    });

    this.checkoutService.discountEmitted$.subscribe((discount: number) => {
      this.discount += discount;
    });
  }

  initPayment() {
    paypal
      .Buttons(
        {
          style: {
            size: 'small',
            height: 30,
            layout: 'vertical',
            label: 'pay'
          },
          funding: {
            allowed: [paypal.FUNDING.CARD],
            disallowed: [paypal.FUNDING.CREDIT]
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.subtotal + this.shippingPrice - this.discount,
                    currency_code: 'USD'
                  }
                }]
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(_details => {
              if (_details.status === 'COMPLETED') {
                this.hiddenCash = true;
                this.messageService.success('Thank for your payment!');
                this.transactionId = _details.purchase_units[0].payments.captures[0].id;
              }
            });
          },
          onError: error => {
            console.log('Error in Payment');
          }

        }).render(this.paypal.nativeElement);
  }

  getPaymentMethod() {
    return {
      paymentMethod: this.paymentMethodForm.controls.method.value,
      transactionId: this.transactionId
    };
  }

}
