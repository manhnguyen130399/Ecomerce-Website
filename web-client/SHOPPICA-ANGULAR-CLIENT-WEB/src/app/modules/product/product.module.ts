import { ProductCardModule } from './../../shared/modules/product-card/product-card.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { shareIcons } from './../../shared/share-icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { productRoutes } from './product.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './components/categories/categories.component';
import { DescriptionsComponent } from './components/descriptions/descriptions.component';
import { ToolbarsComponent } from './components/toolbars/toolbars.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProductComponent } from './page/product/product.component';
import { FilterDrawerComponent } from './components/filter-drawer/filter-drawer.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ContentComponent } from './components/content/content.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
@NgModule({
  declarations: [
    CategoriesComponent,
    DescriptionsComponent,
    ToolbarsComponent,
    PaginationComponent,
    ProductComponent,
    FilterDrawerComponent,
    ContentComponent,
  ],
  imports: [
    CommonModule,
    NzSelectModule,
    NzGridModule,
    NzDrawerModule,
    NzPaginationModule,
    // custom modules
    ProductCardModule,

    NzIconModule.forChild(shareIcons),
    RouterModule.forChild(productRoutes)
  ]
})
export class ProductModule { }
