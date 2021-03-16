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
  @Input() modalTitle = "Add size";
  @Input() sizeObject: Size;
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sizeObject != undefined && changes.sizeObject.currentValue != undefined) {
      this.baseForm.controls.sizeName.setValue(changes.sizeObject.currentValue.sizeName);
      this.modalTitle = "Edit size";
    }
  }

  buildForm() {
    this.baseForm = this.formBuilder.group({
      sizeName: [null, [Validators.required]]
    })
  }

  submitForm() {
    let size = { id: null, sizeName: this.baseForm.get("sizeName").value.trim() };
    super.create(size, this.okModalEvent, this.messageService);
  }

  cancelModal(): void {
    super.cancel(this.cancelModalEvent);
  }

}
