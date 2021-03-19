import { ProductService } from '@modules/product/services/product.service';
import { finalize } from 'rxjs/operators';
import { ProductDetail } from './../../model/product-detail';
import { BaseParams } from './../../../common/base-params';
import { SizeService } from './../../../size/services/size.service';
import { ColorService } from './../../../color/services/color.service';
import { BrandService } from '@modules/brand/services/brand.service';
import { CategoryService } from '@modules/category/services/category.service';
import { Size } from './../../../size/models/size';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { environment } from '@env';
import { Brand } from '@app/modules/brand/models/brand';
import { Category } from '@app/modules/category/models/category';
import { Color } from '@app/modules/color/models/Color';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  isLoadingSize = true;
  isLoadingCategory = true;
  isLoadingColor = true;
  isLoadingBrand = true;
  isLoadingButton = false;
  listCategory: Category[];
  listBrand: Brand[];
  listColor: Color[];
  listSize: Size[];
  listProductDetail: ProductDetail[] = [];
  fileList: NzUploadFile[] = [];
  listSizeSelected: Size[] = [];
  listColorSelected: Color[] = [];
  productForm: FormGroup;
  params = new BaseParams();
  isLoadingProduct = false;
  backEndUrl = `${environment.productServiceUrl}/api/upload`;
  productId: number;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
    private readonly colorService: ColorService,
    private readonly sizeService: SizeService,
    private readonly productService: ProductService,
    private readonly messageService: NzMessageService,
    private readonly activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadCategory();
    this.loadBrand();
    this.loadColor();
    this.loadSize();
    this.productId = this.activatedRoute.snapshot.params.id;
    if (this.productId !== undefined) {
      this.isLoadingProduct = true;
      this.productService.getById(this.productId).pipe(
        finalize(() => this.isLoadingProduct = false)
      )
        .subscribe(res => {
          if (res.code == "OK") {
            let listColor = [];
            let listSize = [];
            let listProductDetail = [];
            let listFile = [];
            const product = res.data;
            this.productForm.controls.productName.setValue(product.productName);
            this.productForm.controls.price.setValue(product.price);
            this.productForm.controls.categoryId.setValue(product.categoryId);
            this.productForm.controls.brandId.setValue(product.brandId);

            console.log(product);
            product.productImages.forEach((pi) => {
              let file = {
                uid: '-1',
                url: pi.image,
                name: 'image.png',
                status: 'done',
              };
              listFile.push(file)
            })
            this.fileList = listFile;
            product.productDetails.forEach(item => {
              listColor.push(item.colorId);
              listSize.push(item.sizeId);
              listProductDetail.push(item);
            })

            this.listSizeSelected = this.listSize.filter(x => listSize.includes(x.id));
            this.listColorSelected = this.listColor.filter(x => listColor.includes(x.id));
            this.listProductDetail = listProductDetail;
          }
        })
    }

  }

  loadCategory() {
    this.params.pageSize = 50;
    this.categoryService.getAll(this.params).pipe(
      finalize(() => this.isLoadingCategory = false)
    ).subscribe(
      res => {
        if (res.code == "OK") {
          this.listCategory = res.data.content;
        }
      }
    )
  }

  loadBrand() {
    this.params.pageSize = 50;
    this.brandService.getAll(this.params).pipe(
      finalize(() => this.isLoadingBrand = false)
    ).subscribe(
      res => {
        if (res.code == "OK") {
          this.listBrand = res.data.content;
        }
      }
    )
  }

  loadColor() {
    this.params.pageSize = 50;
    this.colorService.getAll(this.params).pipe(
      finalize(() => this.isLoadingColor = false)
    ).subscribe(
      res => {
        if (res.code == "OK") {
          this.listColor = res.data.content;
        }
      }
    )
  }

  loadSize() {
    this.params.pageSize = 50;
    this.sizeService.getAll(this.params).pipe(
      finalize(() => this.isLoadingSize = false)
    ).subscribe(
      res => {
        if (res.code == "OK") {
          this.listSize = res.data.content;
        }
      }
    )
  }

  buildForm() {
    this.productForm = this.formBuilder.group({
      productName: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      brandId: [null, Validators.required],
      categoryId: [null, Validators.required],
    })
  }

  handleChange = (info: NzUploadChangeParam) => {
  }

  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  submitForm() {
    let product = {
      id: null,
      categoryName: null,
      brandName: null,
      productName: this.productForm.get("productName").value,
      price: this.productForm.get("price").value,
      categoryId: this.productForm.get("categoryId").value,
      brandId: this.productForm.get("brandId").value,
      productDetails: this.listProductDetail,
      productImages: [],
      images: []
    };

    this.fileList.forEach(f => {
      console.log(this.fileList);
      if (f.status === "done") {
        this.productId == undefined || f.url === undefined ? product.images.push(f.response.data[0]) : product.images.push(f.url);
      }
    })

    this.isLoadingButton = true;

    if (this.productId != undefined) {
      product.id = this.productId;
      this.productService
        .update(product)
        .pipe(finalize(() => (this.isLoadingButton = false)))
        .subscribe((res) => {
          if (res.code == 'OK') {
            this.messageService.create('success', `Update product successfully!`);
            this.productForm.reset();
          }
        });
    }
    else {
      this.productService
        .create(product)
        .pipe(finalize(() => (this.isLoadingButton = false)))
        .subscribe((res) => {
          if (res.code == 'OK') {
            this.messageService.create('success', `Create product successfully!`);
            this.productForm.reset();
          }
        });
    }

  }

  changeSize(data: Size[]) {
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
  }

  changeColor(data: Color[]) {
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
  }

  delete(productDetail: ProductDetail) {
    this.listProductDetail = this.listProductDetail.filter(x =>
      (x.colorId !== productDetail.colorId || x.sizeId !== productDetail.sizeId)
    );
  }

}
