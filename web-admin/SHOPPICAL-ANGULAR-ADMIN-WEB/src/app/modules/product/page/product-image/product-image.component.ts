import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '@env';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { ProductService } from '../../services/product.service';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent implements OnInit {
  backEndUrl = `${environment.productServiceUrl}/api/upload`;
  @Input() listImage: NzUploadFile[];
  @Output() listImageChange = new EventEmitter<NzUploadFile[]>();

  previewImage: string | undefined = '';
  previewVisible = false;
  constructor(
    private readonly productService: ProductService
  ) { }

  ngOnInit(): void {

  }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  handleChange = (info: NzUploadChangeParam) => {
    this.listImageChange.emit(this.listImage);
  }

  removeFile = (file: NzUploadFile) => {
    this.productService
      .deleteImage(file.id)
      .subscribe((data) => {
      });
    return true;
  }

}
