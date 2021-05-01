import { ProductCardModule } from './../../shared/modules/product-card/product-card.module';
import { ProductCarouselModule } from './../../shared/modules/product-carousel/product-carousel.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SectionTitleModule } from '@shared/modules/section-title/section-title.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { shareIcons } from '@shared/share-icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StoreInfoComponent } from './pages/store-info/store-info.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { storeRoutes } from './store.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DiscountsComponent } from './components/discounts/discounts.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { ProductsComponent } from './components/products/products.component';
import { IndexComponent } from './pages/index/index.component';
import { AllProductComponent } from './pages/all-product/all-product.component';
import { HomeStoreComponent } from './pages/home-store/home-store.component';
import { LoaderModule } from '@shared/modules/loader/loader.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';



@NgModule({
  declarations: [
    HeaderComponent,
    DiscountsComponent,
    BestSellerComponent,
    ProductsComponent,
    StoreInfoComponent,
    IndexComponent,
    AllProductComponent,
    HomeStoreComponent
  ],
  imports: [
    CommonModule,
    NzPaginationModule,
    SectionTitleModule,
    NzButtonModule,
    NzInputModule,
    NzGridModule,
    LoaderModule,
    CarouselModule,
    ProductCarouselModule,
    ProductCardModule,
    NzIconModule.forChild(shareIcons),
    RouterModule.forChild(storeRoutes)
  ]
})
export class StoreModule { }
