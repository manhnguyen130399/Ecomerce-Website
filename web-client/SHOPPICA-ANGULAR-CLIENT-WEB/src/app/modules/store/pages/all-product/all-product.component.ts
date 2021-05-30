import { LoaderService } from '@shared/modules/loader/loader.service';
import { Product } from '../../../../core/model/product/product';
import { Component, OnInit } from '@angular/core';
import { ShareService } from '@core/services/share/share.service';
import { ProductService } from '@core/services/product/product.service';
import { CategoryService } from '@core/services/category/category.service';
import { Category } from '@core/model/category/category';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  storeId: number;
  currentCategoryName: string;
  categories: Category[] = [];
  constructor(
    private readonly categoryService: CategoryService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.activatedRoute.parent.params.subscribe(params => {
      this.storeId = params.storeId;
    });

  }
  ngOnInit(): void {
    this.loadCategoryByStore();

    this.activatedRoute.queryParams.subscribe(qp => {
      this.currentCategoryName = qp.category;
    })
  }

  loadCategoryByStore() {
    this.categoryService.getCategoryByStore(this.storeId)
      .subscribe((res) => {
        this.categories = res.data.content;
      });
  }

  selectCategory(categoryName: string) {
    this.router.navigate(['/store/', this.storeId, 'allProduct'],
      {
        queryParams: {
          category: categoryName.toLowerCase()
        },
        queryParamsHandling: 'merge'
      });
  }

}
