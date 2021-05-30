import { Color } from './../../../color/models/Color';
import { finalize } from 'rxjs/operators';
import { SizeService } from './../../services/size.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Size } from '../../models/size';
import { BaseModalComponent } from '@app/modules/common/base-modal-component';

@Component({
  selector: 'app-size-modal',
  templateUrl: './size-modal.component.html',
  styleUrls: ['./size-modal.component.css']
})
export class SizeModalComponent extends BaseModalComponent<Size> implements OnInit {
  @Input() isVisible = false;
  @Input() modalTitle = "ADD SIZE";
  @Input() sizeObject: Size;
  sizes: string[];
  isLoadingSizeInSelect = false;
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<Size>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly sizeService: SizeService,
    private readonly messageService: NzMessageService) {
    super(sizeService);
  }

  ngOnInit(): void {
    this.buildForm();
    this.getAllSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sizeObject != undefined && changes.sizeObject.currentValue != undefined) {
      this.baseForm.controls.sizeName.setValue(changes.sizeObject.currentValue.sizeName);
      this.modalTitle = "Edit size";
    }
  }

  getAllSize() {
    this.isLoadingSizeInSelect = true;
    this.sizeService.getAllStore().pipe(
      finalize(() => this.isLoadingSizeInSelect = false)
    ).subscribe(res => {
      if (res.code === 'OK') {
        this.sizes = res.data.map(x => x.sizeName).sort((a, b) => a.localeCompare(b));
      }
    })
  }

  buildForm() {
    this.baseForm = this.formBuilder.group({
      sizeName: [null, Validators.required],
    })
  }

  submitForm() {
    super.create(this.baseForm.value, this.okModalEvent, this.messageService);
    this.getAllSize();
  }

  cancelModal(): void {
    super.cancel(this.cancelModalEvent);
  }

  addItem(input: HTMLInputElement): void {
    if (this.sizes.indexOf(input.value) === -1 && input.value) {
      this.sizes = [...this.sizes, input.value];
      input.value = null;
    }
  }
}
