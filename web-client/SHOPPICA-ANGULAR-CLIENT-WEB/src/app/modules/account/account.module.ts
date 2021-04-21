import { NzMessageModule } from 'ng-zorro-antd/message';
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
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AccountComponent } from './page/account/account.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ResetPasswordComponent } from './page/reset-password/reset-password.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AddressComponent } from './components/address/address.component';
import { LoginComponent } from './page/login/login.component';


@NgModule({
  declarations: [
    DashboardComponent,
    OrderHistoryComponent,
    AccountComponent,
    SidebarComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    AddressComponent,
    LoginComponent
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
    NzMessageModule,
    NzRadioModule,
    NzIconModule.forChild(shareIcons),
    RouterModule.forChild(accountRoutes)
  ]
})
export class AccountModule { }
