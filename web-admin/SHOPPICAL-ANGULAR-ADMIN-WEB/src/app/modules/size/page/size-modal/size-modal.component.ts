import { finalize } from 'rxjs/operators';
import { SizeService } from './../../services/size.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Size } from '../../models/size';

@Component({
  selector: 'app-size-modal',
  templateUrl: './size-modal.component.html',
  styleUrls: ['./size-modal.component.css']
})
export class SizeModalComponent implements OnInit {
  @Input() isVisible = false;
  @Input() modalTitle = "Add size";
  @Input() sizeObject: Size;
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<Size>();
  isLoading = false;
  isEditMode = false;
  sizeForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly sizeService: SizeService,
    private readonly messageService: NzMessageService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sizeObject != undefined && changes.sizeObject.currentValue != undefined) {
      this.sizeForm.controls.sizeName.setValue(changes.sizeObject.currentValue.sizeName);
      this.modalTitle = "Edit size";
    }
  }

  buildForm() {
    this.sizeForm = this.formBuilder.group({
      sizeName: [null, [Validators.required]]
    })
  }

  submitForm() {
    this.isLoading = true;
    let size = { id: null, sizeName: this.sizeForm.get("sizeName").value.trim() };
    this.sizeService.create(size).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      if (res.code == "OK") {
        this.messageService.create("success", `Create size successfully!`);
        this.okModalEvent.emit(res.data);
        this.sizeForm.reset();
      }
    });
  }

  handleCancel(): void {
    this.cancelModalEvent.emit();
    this.sizeForm.reset();
  }

}
