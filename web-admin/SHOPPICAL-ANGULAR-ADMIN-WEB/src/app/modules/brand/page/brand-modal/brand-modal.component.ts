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
  @Input() modalTitle = "ADD BRAND";
  @Input() brandObject: Brand;
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<Brand>();
  brands: string[] = [];
  isLoadingBrandInSelect = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly brandService: BrandService,
    private readonly messageService: NzMessageService
  ) {
    super(brandService);
  }

  ngOnInit(): void {
    this.buildForm();
    this.getBrandAllStore();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sizeObject != undefined && changes.sizeObject.currentValue != undefined) {
      this.baseForm.controls.sizeName.setValue(changes.sizeObject.currentValue.sizeName);
      this.modalTitle = "Edit brand";
    }
  }

  addItem(input: HTMLInputElement): void {
    if (this.brands.indexOf(input.value) === -1 && input.value) {
      this.brands = [...this.brands, input.value];
      input.value = null;
    }
  }

  getBrandAllStore() {
    this.isLoadingBrandInSelect = true;
    this.brandService.getBrandAllStore().pipe(
      finalize(() => this.isLoadingBrandInSelect = false)
    ).subscribe(res => {
      if (res.code === 'OK') {
        this.brands = res.data.map(x => x.brandName).sort((a, b) => a.localeCompare(b));
      }
    })
  }

  buildForm() {
    this.baseForm = this.formBuilder.group({
      brandName: [null, [Validators.required]]
    })
  }

  submitForm() {
    super.create(this.baseForm.value, this.okModalEvent, this.messageService);
    this.getBrandAllStore();
  }

  handleCancel(): void {
    super.cancel(this.cancelModalEvent)
  }
}
