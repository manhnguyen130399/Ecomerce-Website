import { SectionTitleModule } from './../../shared/modules/section-title/section-title.module';
import { ProductCarouselModule } from './../../shared/modules/product-carousel/product-carousel.module';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { cartRoutes } from './cart.routing';
import { RouterModule } from '@angular/router';
import { CartItemModule } from './../../shared/modules/cart-item/cart-item.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRowComponent } from './components/cart-row/cart-row.component';
import { CartFooterComponent } from './components/cart-footer/cart-footer.component';
import { ShippingCalculatorComponent } from './components/shipping-calculator/shipping-calculator.component';
import { CartComponent } from './page/cart/cart.component';



@NgModule({
  declarations: [CartRowComponent, CartFooterComponent, ShippingCalculatorComponent, CartComponent],
  imports: [
    CommonModule,
    FormsModule,

    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,

    RouterModule.forChild(cartRoutes),
    CartItemModule,
    ProductCarouselModule,
    SectionTitleModule
  ]
})
export class CartModule { }
