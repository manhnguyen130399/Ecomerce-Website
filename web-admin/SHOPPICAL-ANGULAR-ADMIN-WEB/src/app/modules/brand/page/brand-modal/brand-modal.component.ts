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
export class BrandModalComponent implements OnInit {

  @Input() isVisible = false;
  @Input() modalTitle = "Add brand";
  @Input() brandObject: Brand;
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<string>();
  isLoading = false;
  isEditMode = false;
  brandForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly brandService: BrandService,
    private readonly messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sizeObject != undefined && changes.sizeObject.currentValue != undefined) {
      this.brandForm.controls.sizeName.setValue(changes.sizeObject.currentValue.sizeName);
      this.modalTitle = "Edit brand";
    }
  }

  buildForm() {
    this.brandForm = this.formBuilder.group({
      brandName: [null, [Validators.required]]
    })
  }

  submitForm() {
    this.isLoading = true;
    const brandName = this.brandForm.get("brandName").value.trim();
    this.brandService.createBrand(brandName).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      if (res.code == "OK") {
        this.messageService.create("success", `Create brand successfully!`);
        this.okModalEvent.emit();
        this.brandForm.reset();
      }
    });
  }

  handleCancel(): void {
    this.cancelModalEvent.emit();
    this.brandForm.reset();
  }
}
