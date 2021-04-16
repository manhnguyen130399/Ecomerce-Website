import { InformationComponent } from './components/information/information.component';
import { CheckoutComponent } from './page/checkout/checkout.component';
import { Routes } from '@angular/router';
import { ShippingComponent } from './components/shipping/shipping.component';
export const checkoutRoutes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      {
        path: 'information',
        component: InformationComponent
      },
      {
        path: 'shipping',
        component: ShippingComponent
      }
    ]
  }
]
