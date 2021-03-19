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
  @Output() listProductDetailChange = new EventEmitter<ProductDetail[]>();

  isLoadingSizeInSelect = true;
  isLoadingColorInSelect = true;

  listColor: Color[] = [];
  listSize: Size[] = [];
  listSizeSelected: Size[] = [];
  listColorSelected: Color[] = [];

  listSizeIdOfEditProduct: number[] = [];
  listColorIdOfEditProduct: number[] = [];

  params = new BaseParams();
  constructor(
    private readonly colorService: ColorService,
    private readonly sizeService: SizeService,
  ) { }

  ngOnInit(): void {
    this.loadColor();
    this.loadSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listProductDetail != undefined && changes.listProductDetail.currentValue.length > 0) {
      changes.listProductDetail.currentValue.forEach(item => {
        this.listSizeIdOfEditProduct.push(item.sizeId);
        this.listColorIdOfEditProduct.push(item.colorId);
      });

      //get color selected
      this.listColorSelected = this.listColor.filter(
        x => this.listColorIdOfEditProduct.includes(x.id)
      );
      //get size selected
      this.listSizeSelected = this.listSize.filter(
        x => this.listSizeIdOfEditProduct.includes(x.id)
      );
    }
  }

  loadColor() {
    this.params.pageSize = 50;
    this.colorService.getAll(this.params).pipe(
      finalize(() => this.isLoadingColorInSelect = false)
    ).subscribe(
      res => {
        if (res.code == "OK") {
          this.listColor = res.data.content;
          //get color selected
          this.listColorSelected = this.listColor.filter(
            x => this.listColorIdOfEditProduct.includes(x.id)
          );
        }
      }
    )
  }

  loadSize() {
    this.params.pageSize = 50;
    this.sizeService.getAll(this.params).pipe(
      finalize(() => this.isLoadingSizeInSelect = false)
    ).subscribe(
      res => {
        if (res.code == "OK") {
          this.listSize = res.data.content;
          //get size selected
          this.listSizeSelected = this.listSize.filter(
            x => this.listSizeIdOfEditProduct.includes(x.id)
          );
        }
      }
    )
  }

  selectSize(data: Size[]) {
    this.listProductDetail = [];
    this.listColorSelected.forEach(color => {
      this.listSizeSelected.forEach(size => {
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
    this.listProductDetailChange.emit(this.listProductDetail);
  }

  selectColor(data: Color[]) {
    this.listProductDetail = [];
    this.listSizeSelected.forEach(sizeId => {
      this.listColorSelected.forEach(colorId => {
        let productDetail = {
          id: null,
          quantity: 0,
          colorId: colorId.id,
          color: colorId.colorName,
          sizeId: sizeId.id,
          size: sizeId.sizeName
        }
        this.listProductDetail.push(productDetail);
      })
    });
    this.listProductDetailChange.emit(this.listProductDetail);
  }

  deleteProductDetail(productDetail: ProductDetail) {
    this.listProductDetail = this.listProductDetail.filter(x =>
      (x.colorId !== productDetail.colorId || x.sizeId !== productDetail.sizeId)
    );
  }

}
