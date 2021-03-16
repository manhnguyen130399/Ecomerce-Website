import { SharedModule } from './../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PromotionListComponent } from './page/promotion-list/promotion-list.component';
import { PromotionModalComponent } from './page/promotion-modal/promotion-modal.component';
import { promotionRoute } from './promotion.routing';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [
    PromotionListComponent,
    PromotionModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(promotionRoute),
    SharedModule,
    NzDatePickerModule,
    NzSelectModule
  ],
  providers: [DatePipe]
})
export class PromotionModule { }
