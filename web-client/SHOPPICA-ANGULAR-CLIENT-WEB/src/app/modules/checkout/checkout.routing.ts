import { LeaveCheckoutPageGuard } from './../../core/guards/leave-checkout-page.guard';
import { PaymentComponent } from './components/payment/payment.component';
import { InformationComponent } from './components/information/information.component';
import { CheckoutComponent } from './page/checkout/checkout.component';
import { Routes } from '@angular/router';
import { ShippingComponent } from './components/shipping/shipping.component';
export const checkoutRoutes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    canDeactivate: [LeaveCheckoutPageGuard],
    children: [
      {
        path: 'information',
        component: InformationComponent,
        data: {
          title: 'Checkout Information'
        },
      },
      {
        path: 'payment',
        component: ShippingComponent,
        data: {
          title: 'Checkout Payment'
        },
      },
    ]
  }
];
