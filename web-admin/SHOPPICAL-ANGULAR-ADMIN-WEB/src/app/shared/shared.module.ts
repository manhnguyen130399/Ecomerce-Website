
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZoroAntdModule } from './ng-zoro-antd.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgZoroAntdModule,
    FormsModule

  ],
  exports: [
    ReactiveFormsModule,
    NgZoroAntdModule,
    FormsModule
  ]
})
export class SharedModule { }
