import { FormBuilder, FormGroup } from '@angular/forms';
import { CartItemOptions } from '@shared/modules/cart-item/models/cart-item-options.model';
import { CartItem } from '@core/model/cart/cart-item';
import { Product } from '@core/model/product/product';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '@core/services/product/product.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent implements OnInit {

  @Input() isVisible;
  @Output() closeSearchModalEvent = new EventEmitter();
  searchForm: FormGroup;
  pageIndex = 1;
  pageSize = 6;
  listProduct: Product[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly router: Router

  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      keyword: [null],
    });
  }

  handleCancel() {
    this.closeSearchModalEvent.emit();
  }

  searchProductFullText(keyword: string) {
    this.productService.searchProductByFullText(this.pageIndex
      , this.pageSize, keyword).subscribe((res) => {
        if (res.code == 'OK') {
          this.listProduct = res.data.content;
          this.searchForm.reset();
        }
      });
  }

  submitForm() {
    this.searchProductFullText(this.searchForm.get('keyword').value);
  }

  viewDetail(id: number) {
    this.handleCancel();
    this.router.navigate(['/product/detail/', id]);

  }
}
