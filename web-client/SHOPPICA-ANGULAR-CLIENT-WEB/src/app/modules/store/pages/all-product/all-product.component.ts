import { Product } from '../../../../core/model/product/product';
import { Component, OnInit } from '@angular/core';
import { ShareService } from '@core/services/share/share.service';
import { ProductService } from '@core/services/product/product.service';
import { CategoryService } from '@core/services/category/category.service';
import { Category } from '@core/model/category/category';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  storeId: number;
  categories: Category[] = [];
  isLoading: boolean = true;
  constructor(private readonly categoryService: CategoryService, private readonly router: ActivatedRoute, private readonly shareService: ShareService) {
    this.router.params.subscribe(params => {
      this.storeId = params.id;
      this.shareService.storeInfoSuccessEvent(params.id)
    });

  }
  ngOnInit(): void {
    this.loadCategoryByStore()
  }

  loadCategoryByStore() {
    this.categoryService.getCategoryByStore(this.storeId).pipe(finalize(() => this.isLoading = false)).subscribe((res) => {
      this.categories = res.data.content;
    })

  }



}
