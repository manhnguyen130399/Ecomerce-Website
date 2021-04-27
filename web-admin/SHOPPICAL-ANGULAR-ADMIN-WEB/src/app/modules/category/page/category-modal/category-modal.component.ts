import { BaseModalComponent } from '@app/modules/common/base-modal-component';
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
export class CategoryModalComponent extends BaseModalComponent<Category> implements OnInit {
  @Input() isVisible = false;
  @Input() modalTitle = 'Add Category';
  @Input() category: Category;
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<Category>();
  isHaveFile = false;
  backEndUrl = `${environment.productServiceUrl}/api/upload`;
  fileList: NzUploadFile[] = [];

  constructor(
    private readonly categoryService: CategoryService,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: NzMessageService
  ) {
    super(categoryService);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.baseForm = this.formBuilder.group({
      categoryName: [null, Validators.required],
    });
  }

  cancelModal(): void {
    super.cancel(this.cancelModalEvent);
    this.fileList = [];
  }

  submitForm() {
    let category = {
      id: null,
      categoryName: this.baseForm.get("categoryName").value,
      image: this.fileList[0].response.data[0],
    }
    super.create(category, this.okModalEvent, this.messageService);
    this.fileList = [];
  }

  handleChange = (info: NzUploadChangeParam) => {
    this.isHaveFile = false;
    console.log(this.fileList);
    this.fileList.forEach(x => {
      if (x.status === 'done') {
        this.isHaveFile = true;
      }
    });
  }

}
