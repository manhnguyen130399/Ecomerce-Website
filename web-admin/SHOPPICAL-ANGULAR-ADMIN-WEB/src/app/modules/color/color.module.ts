import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ColorListComponent } from './page/color-list/color-list.component';
import { ColorModalComponent } from './page/color-modal/color-modal.component';
import { colorRoutes } from './color.routing';
import { SharedModule } from '@app/shared/shared.module';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    ColorListComponent,
    ColorModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ColorPickerModule,
    RouterModule.forChild(colorRoutes)
  ],
})
export class ColorModule { }
