import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZoroAntdModule } from './ng-zoro-antd.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZoroAntdModule
  ],
  exports: [
    NgZoroAntdModule
  ]
})
export class SharedModule { }
