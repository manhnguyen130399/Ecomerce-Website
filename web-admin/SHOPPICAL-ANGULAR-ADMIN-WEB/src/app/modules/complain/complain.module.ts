import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { complainRoutes} from './complain.routing';
import { ComplainListComponent } from './page/complain-list/complain-list.component';
import { ComplainModalComponent } from './page/complain-modal/complain-modal.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ComplainListComponent, ComplainModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(complainRoutes)
  ]
})
export class ComplainModule { }
