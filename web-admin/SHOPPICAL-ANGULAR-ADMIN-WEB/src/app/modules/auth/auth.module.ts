import { routes } from './auth.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { LoginComponent } from '@modules/auth/page/login/login.component';
import { RegisterComponent } from '@modules/auth/page/register/register.component';

import { icons } from './auth-icon';
import { SellerInfoComponent } from './page/seller-info/seller-info.component';
import { StoreInfoComponent } from './page/store-info/store-info.component';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SellerInfoComponent,
    StoreInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzGridModule,
    NzStepsModule,
    NzTimePickerModule,
    NzRadioModule,
    NzIconModule.forChild(icons)
  ],
  providers: [DatePipe]
})
export class AuthModule { }
