import { ProductDetail } from './../../model/product-detail';
import { ProductService } from '@modules/product/services/product.service';
import { finalize, map } from 'rxjs/operators';
import { BaseParams } from '@modules/common/base-params';
import { BrandService } from '@modules/brand/services/brand.service';
import { CategoryService } from '@modules/category/services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Brand } from '@modules/brand/models/brand';
import { Category } from '@modules/category/models/category';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env';
import { ProductOptionComponent } from '../product-option/product-option.component';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @ViewChild(ProductOptionComponent) productOption: ProductOptionComponent;

  backEndUrl = `${environment.productServiceUrl}/api/product/import`;
  isLoadingCategoryInSelect = true;
  isLoadingBrandInSelect = true;
  isLoadingProductEdit = false;
  isLoadingButtonSubmit = false;

  listCategory: Category[];
  listBrand: Brand[];
  productForm: FormGroup;
  params = new BaseParams();

  //image
  listImage: NzUploadFile[] = [];

  //productDetail

  listProductDetail: ProductDetail[] = [];

  sizeIdsSelected: number[] = [];
  colorIdsSelected: number[] = [];
  productId: number;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
    private readonly productService: ProductService,
    private readonly messageService: NzMessageService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadCategory();
    this.loadBrand();

    //edit mode
    this.activatedRoute.params.subscribe(params => {
      if (params.productId) {
        this.productId = params.productId
        this.loadProductEdit(this.productId);
      }
    });
  }

  loadProductEdit(productId: number) {
    this.isLoadingProductEdit = true;
    this.productService.getById(productId).pipe(
      finalize(() => this.isLoadingProductEdit = false)
    )
      .subscribe(res => {
        if (res.code == "OK") {
          const product = res.data;

          this.productForm.controls.productName.setValue(product.productName);
          this.productForm.controls.price.setValue(product.price);
          this.productForm.controls.categoryId.setValue(product.categoryId);
          this.productForm.controls.brandId.setValue(product.brandId);
          this.productForm.controls.description.setValue(product.description);

          this.listImage = product.productImages.map((productImage, index) => {
            return {
              uid: index,
              id: productImage.id,
              url: productImage.image,
              name: 'image.png',
            };
          });

          this.listProductDetail = [...product.productDetails];
          this.loadColorSizeSelected(product.productDetails)
        }
      });
  }

  loadColorSizeSelected(productDetails) {
    const sizeIds = new Set<number>();
    const colorIds = new Set<number>();
    productDetails.forEach(item => {
      sizeIds.add(item.sizeId);
      colorIds.add(item.colorId);
    });
    this.colorIdsSelected = [...colorIds];
    this.sizeIdsSelected = [...sizeIds];
  }


  buildForm() {
    this.productForm = this.formBuilder.group({
      productName: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      brandId: [null, Validators.required],
      categoryId: [null, Validators.required],
      description: [null]
    })
  }

  loadCategory() {
    this.params.pageSize = 50;
    this.categoryService.getAll(this.params).pipe(
      finalize(() => this.isLoadingCategoryInSelect = false)
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
      finalize(() => this.isLoadingBrandInSelect = false)
    ).subscribe(
      res => {
        if (res.code == "OK") {
          this.listBrand = res.data.content;
        }
      }
    )
  }

  submitForm() {
    let product = {
      id: null,
      categoryName: null,
      brandName: null,
      description: this.productForm.get("description").value,
      productName: this.productForm.get("productName").value,
      price: this.productForm.get("price").value,
      categoryId: this.productForm.get("categoryId").value,
      brandId: this.productForm.get("brandId").value,
      productDetails: this.productOption.getProductDetails(),
      productImages: [],
      images: []
    };

    this.listImage.forEach(f => {
      if (f.status === "done") {
        this.productId == undefined || f.url === undefined ? product.images.push(f.response.data[0]) : product.images.push(f.url);
      }
    })

    this.isLoadingButtonSubmit = true;

    //edit mode
    if (this.productId != undefined) {
      product.id = this.productId;
      this.productService
        .update(product)
        .pipe(finalize(() => (this.isLoadingButtonSubmit = false)))
        .subscribe((res) => {
          if (res.code == 'OK') {
            this.messageService.create('success', `Update product successfully!`);
          }
        });
    }
    //create mode
    else {
      this.productService
        .create(product)
        .pipe(finalize(() => (this.isLoadingButtonSubmit = false)))
        .subscribe((res) => {
          if (res.code == 'OK') {
            this.messageService.create('success', `Create product successfully!`);
            this.productForm.reset();
            this.listProductDetail = [];
            this.listImage = [];

          }
        });
    }
  }

}
