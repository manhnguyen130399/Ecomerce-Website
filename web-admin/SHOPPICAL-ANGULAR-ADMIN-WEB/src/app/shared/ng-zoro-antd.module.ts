import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule
  ],
  exports: [
    NzTableModule,
    NzButtonModule,
    NzModalModule
  ]
})
export class NgZoroAntdModule { }
