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
  @Input() modalTitle = 'ADD CATEGORY';
  @Input() category: Category;
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<Category>();
  isHaveFile = false;
  categories: Category[] = [];
  backEndUrl = `${environment.productServiceUrl}/api/upload`;
  fileList: NzUploadFile[] = [];
  isLoadingCategoryInSelect = false;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: NzMessageService
  ) {
    super(categoryService);
  }

  ngOnInit(): void {
    this.buildForm();
    this.getCategoryAllStore();
  }

  getCategoryAllStore() {
    this.isLoadingCategoryInSelect = true;
    this.categoryService.getAllStore().pipe(
      finalize(() => this.isLoadingCategoryInSelect = false)
    ).subscribe(res => {
      if (res.code === 'OK') {
        this.categories = res.data;
      }
    })
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
    const category = this.baseForm.get("categoryName").value;
    let request;
    if (category.id == -1) {
      request = {
        categoryName: category.categoryName,
        image: this.fileList[0].response.data[0],
      }
    }
    else {
      request = {
        categoryName: category.categoryName,
      }
    }
    super.create(request, this.okModalEvent, this.messageService);
    this.fileList = [];
    this.getCategoryAllStore();
  }

  handleChange = (info: NzUploadChangeParam) => {
    this.isHaveFile = false;
    this.fileList.forEach(x => {
      if (x.status === 'done') {
        this.isHaveFile = true;
      }
    });
  }

  changeCategory(category: Category) {
    this.fileList = [];
    if (category.id !== -1) {
      let file = {
        uid: category.id.toString(),
        url: category.image,
        name: 'image.png',
      };
      this.fileList.push(file);
      this.isHaveFile = true;
    }
  }

  addItem(input: HTMLInputElement): void {
    if (this.categories.findIndex(x => x.categoryName == input.value) === -1 && input.value) {
      this.categories = [...this.categories, { id: -1, categoryName: input.value, image: "" }];
      input.value = null;
    }
  }

}
