import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { shareIcons } from './../../shared/share-icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { HeaderPageModule } from './../../shared/modules/header-page/header-page.module';
import { accountRoutes } from './account.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddressComponent } from './components/addresses/address/address.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AccountComponent } from './page/account/account.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddressFormComponent } from './components/addresses/address-form/address-form.component';
import { AddressPageComponent } from './components/addresses/address-page/address-page.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AddressComponent,
    OrderHistoryComponent,
    WishListComponent,
    AccountComponent,
    SidebarComponent,
    AddressFormComponent,
    AddressPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderPageModule,

    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzCheckboxModule,
    NzIconModule.forChild(shareIcons),
    RouterModule.forChild(accountRoutes)
  ]
})
export class AccountModule { }
