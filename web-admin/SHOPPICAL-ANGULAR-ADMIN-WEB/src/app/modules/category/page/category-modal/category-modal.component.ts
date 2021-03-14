import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
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
      imageUrl: null,
    });
  }

  handleCancel(): void {
    this.cancelModalEvent.emit();
    this.categoryForm.reset();
  }

  submitForm() {
    this.isLoading = true;
    let category = {
      id: null,
      categoryName: this.categoryForm.get("categoryName").value,
      imageUrl: this.categoryForm.get("imageUrl").value,
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
        }
      });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.categoryForm.patchValue({
        file: file,
      });
    }
  }
}
