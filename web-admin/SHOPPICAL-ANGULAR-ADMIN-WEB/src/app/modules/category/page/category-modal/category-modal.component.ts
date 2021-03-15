import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '@env';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { finalize } from 'rxjs/operators';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css'],
})
export class CategoryModalComponent implements OnInit {
  @Input() isVisible = false;
  @Input() modalTitle = 'Add Category';
  @Input() category: Category;
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<Category>();
  isLoading = false;
  isHaveFile = false;
  backEndUrl = `${environment.productServiceUrl}/api/upload`;
  fileList: NzUploadFile[] = [];
  categoryForm: FormGroup;
  constructor(
    private readonly categoryService: CategoryService,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.categoryForm = this.formBuilder.group({
      categoryName: [null, Validators.required],
    });
  }

  handleCancel(): void {
    this.cancelModalEvent.emit();
    this.categoryForm.reset();
    this.fileList = [];
  }

  submitForm() {
    this.isLoading = true;
    let category = {
      id: null,
      categoryName: this.categoryForm.get("categoryName").value,
      image: this.fileList[0].response.data[0],
    }
    this.categoryService
      .create(category)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((res) => {
        if (res.code == 'OK') {
          this.messageService.create(
            'success',
            ' Created category successfully!'
          );
          this.okModalEvent.emit(res.data);
          this.categoryForm.reset();
          this.fileList = [];
        }
      });
  }

  handleChange = (info: NzUploadChangeParam) => {
    this.fileList.forEach(x => {
      if (x.status === 'done') {
        this.isHaveFile = true;
      }
      else {
        this.isHaveFile = false;
      }
    });
  }
}
