import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { storeRoutes } from './store.routing';
import { StoreListComponent } from './page/store-list/store-list.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [StoreListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(storeRoutes)
  ]
})
export class StoreModule { }
