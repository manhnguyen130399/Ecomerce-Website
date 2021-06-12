import { LoaderService } from './../../../shared/modules/loader/loader.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '@core/model/product/product';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '@core/services/product/product.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { debounceTime, distinctUntilChanged, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { Observable, Observer, of } from 'rxjs';
import { getBase64 } from '@core/helper/form';
import { environment } from '@env';

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
  keyword: string = '';
  avatarUrl?: string;
  listProduct: Product[] = [];
  imgAnalyzer: string = "http://52.221.254.26:5000/api/image-analyzer";
  // imgAnalyzer: string = `${environment.productServiceUrl}/api/upload`;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly router: Router,
    private msg: NzMessageService,
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.searchForm.controls.keyword.valueChanges.pipe(
      filter((value) => {
        value = value?.trim();
        this.keyword = value;
        if (value) {
          this.loaderService.showLoader('search');
          this.avatarUrl = '';
          return value;
        }
        else {
          this.listProduct = [];
        }
      }),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(keywords => {
        return this.productService.searchProductByFullText(this.pageIndex, this.pageSize, [keywords])
      })
    ).subscribe(res => {
      if (res.code == 'OK') {
        this.listProduct = res.data.content;
      }
      this.loaderService.hideLoader('search');
    })
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      keyword: [''],
    });
  }

  handleCancel() {
    this.clearProducts();
    this.clearSearchText();
    this.clearImage();
    this.closeSearchModalEvent.emit();
  }

  clearProducts() {
    this.listProduct = [];
  }

  clearSearchText() {
    this.searchForm.reset();
    this.keyword = '';
  }

  clearImage() {
    this.avatarUrl = '';
  }

  removeImageSearch() {
    this.clearImage();
    this.clearProducts();
    this.clearSearchText();

    console.log(this.keyword, this.listProduct.length);

  }

  searchProductFullText(keywords: string[]) {
    this.keyword = keywords[0];
    this.loaderService.showLoader('search');
    this.productService.searchProductByFullText(this.pageIndex, this.pageSize, keywords)
      .pipe(
        finalize(() => this.loaderService.hideLoader('search'))
      )
      .subscribe((res) => {
        if (res.code == 'OK') {
          this.listProduct = res.data.content;
        }
      });
  }

  viewDetail(id: number) {
    this.handleCancel();
    this.router.navigate(['/product/detail/', id]);
  }

  handleChange(info: NzUploadChangeParam): void {
    let id: string;
    if (info.file.status === 'uploading' && info.type === 'start') {
      id = this.msg.loading('Image is loading..', { nzDuration: 0 }).messageId;
    }
    else if (info.file.status === 'done') {
      this.msg.remove(id);
      this.msg.success(`${info.file.name} file uploaded successfully`);
      this.clearSearchText();
      this.searchProductFullText(info.file.response.data);
      getBase64(info.file!.originFileObj!, (img: string) => {
        this.avatarUrl = img;
      });
    }
    else if (info.file.status === 'error') {
      this.msg.remove(id);
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng);
      observer.complete();
    });
  };
}
