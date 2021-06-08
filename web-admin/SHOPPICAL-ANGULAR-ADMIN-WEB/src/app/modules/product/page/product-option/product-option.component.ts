import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Color } from '@app/modules/color/models/Color';
import { ColorService } from '@app/modules/color/services/color.service';
import { BaseParams } from '@app/modules/common/base-params';
import { Size } from '@app/modules/size/models/size';
import { SizeService } from '@app/modules/size/services/size.service';
import { finalize } from 'rxjs/operators';
import { ProductDetail } from '../../model/product-detail';

@Component({
  selector: 'app-product-option',
  templateUrl: './product-option.component.html',
  styleUrls: ['./product-option.component.css']
})
export class ProductOptionComponent implements OnInit {
  @Input() listProductDetail: ProductDetail[] = [];
  @Input() sizeIdsSelected: number[];
  @Input() colorIdsSelected: number[];

  isLoadingSizeInSelect = true;
  isLoadingColorInSelect = true;

  listColor: Color[] = [];
  listSize: Size[] = [];

  params = new BaseParams();
  constructor(
    private readonly colorService: ColorService,
    private readonly sizeService: SizeService,
  ) { }

  ngOnInit(): void {
    this.loadColor();
    this.loadSize();
  }

  loadColor() {
    this.params.pageSize = 50;
    this.colorService.getAll(this.params).pipe(
      finalize(() => this.isLoadingColorInSelect = false)
    ).subscribe(res => {
      if (res.code == "OK") {
        this.listColor = res.data.content;
      }
    })
  }

  loadSize() {
    this.params.pageSize = 50;
    this.sizeService.getAll(this.params).pipe(
      finalize(() => this.isLoadingSizeInSelect = false)
    ).subscribe(res => {
      if (res.code == "OK") {
        this.listSize = res.data.content;
      }
    })
  }

  generateProductDetail() {
    this.listProductDetail = [];
    this.listColor.filter(x => this.colorIdsSelected.includes(x.id)).forEach(color => {
      this.listSize.filter(x => this.sizeIdsSelected.includes(x.id)).forEach(size => {
        let productDetail = {
          id: null,
          quantity: 0,
          colorId: color.id,
          color: color.colorName,
          sizeId: size.id,
          size: size.sizeName
        }
        this.listProductDetail.push(productDetail);
      })
    });

  }

  getProductDetails(): ProductDetail[] {
    return this.listProductDetail;
  }

  deleteProductDetail(productDetail: ProductDetail) {
    this.listProductDetail = this.listProductDetail.filter(x =>
      (x.colorId !== productDetail.colorId || x.sizeId !== productDetail.sizeId)
    );

    if (this.listProductDetail.length === 0) {
      this.colorIdsSelected = [];
      this.sizeIdsSelected = [];
    }
  }

}
