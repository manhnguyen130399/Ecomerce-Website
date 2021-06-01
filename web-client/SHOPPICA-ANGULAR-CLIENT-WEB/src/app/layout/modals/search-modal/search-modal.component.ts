import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '@core/model/product/product';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '@core/services/product/product.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

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
  imgAnalyzer: string = "http://54.254.175.238:5000/api/image-analyzer";

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly router: Router,
    private msg: NzMessageService

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

  searchProductFullText(keywords: string[]) {
    this.productService.searchProductByFullText(this.pageIndex
      , this.pageSize, keywords).subscribe((res) => {
        if (res.code == 'OK') {
          this.listProduct = res.data.content;
          this.searchForm.reset();
        }
      });
  }


  submitForm() {
    this.searchProductFullText([this.searchForm.get('keyword').value]);
  }

  viewDetail(id: number) {
    this.handleCancel();
    this.router.navigate(['/product/detail/', id]);

  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
      this.searchProductFullText(info.file.response.data);

    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }
}
