import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { shareIcons } from './share-icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
@NgModule({
  declarations: [],
  imports: [
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzToolTipModule,
    NzCheckboxModule,
    NzIconModule.forChild(shareIcons),
  ],
  exports: [
    CommonModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzToolTipModule,
    NzCheckboxModule
  ],
  providers: []
})
export class NgZorroAntdModule { }
