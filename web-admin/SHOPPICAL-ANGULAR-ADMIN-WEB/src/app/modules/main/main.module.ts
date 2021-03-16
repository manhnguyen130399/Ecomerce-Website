import { DashboardComponent } from './../dashboard/page/dashboard/dashboard.component';
import { MainLayoutComponent } from '@layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { icons } from './app-icon';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routing';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';


@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    NzMenuModule,
    NzDropDownModule,
    NzPopconfirmModule,
    NzBadgeModule,
    NzButtonModule,
    NzLayoutModule,
    RouterModule.forChild(mainRoutes),
    NzIconModule.forChild(icons),
  ],
})
export class MainModule { }
