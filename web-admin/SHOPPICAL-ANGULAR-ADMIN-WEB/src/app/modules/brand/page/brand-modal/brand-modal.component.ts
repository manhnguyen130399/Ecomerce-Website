import { BaseModalComponent } from '@app/modules/common/base-modal-component';
import { Category } from '@modules/category/models/category';
import { BrandService } from '@modules/brand/services/brand.service';
import { Brand } from '@modules/brand/models/brand';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-brand-modal',
  templateUrl: './brand-modal.component.html',
  styleUrls: ['./brand-modal.component.css']
})
export class BrandModalComponent extends BaseModalComponent<Brand> implements OnInit {

  @Input() isVisible = false;
  @Input() modalTitle = "Add brand";
  @Input() brandObject: Brand;
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<Brand>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly brandService: BrandService,
    private readonly messageService: NzMessageService
  ) {
    super(brandService);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sizeObject != undefined && changes.sizeObject.currentValue != undefined) {
      this.baseForm.controls.sizeName.setValue(changes.sizeObject.currentValue.sizeName);
      this.modalTitle = "Edit brand";
    }
  }

  buildForm() {
    this.baseForm = this.formBuilder.group({
      brandName: [null, [Validators.required]]
    })
  }

  submitForm() {
    let brand = { id: null, brandName: this.baseForm.get("brandName").value.trim() };
    super.create(brand, this.okModalEvent, this.messageService);
  }

  handleCancel(): void {
    super.cancel(this.cancelModalEvent)
  }
}
