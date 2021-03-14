import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';
import { Color } from '../../models/Color';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color-modal',
  templateUrl: './color-modal.component.html',
  styleUrls: ['./color-modal.component.css'],
})
export class ColorModalComponent implements OnInit {
  colorForm: FormGroup;
  @Input() color: Color;
  @Input() modalTitle = 'Add color';
  @Input() isVisible = false;
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<Color>();
  isLoading = false;
  isEditMode = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly colorService: ColorService,
    private readonly messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.colorForm = this.formBuilder.group({
      colorName: [null, [Validators.required]],
    });
  }

  submitForm() {
    this.isLoading = true;
    let color = { id: null, colorName: this.colorForm.get('colorName').value.trim() };
    this.colorService
      .create(color)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((res) => {
        if (res.code == 'OK') {
          this.messageService.create('success', `Create color successfully!`);
          this.okModalEvent.emit(res.data);
          this.colorForm.reset();
        }
      });
  }

  handleCancel(): void {
    this.cancelModalEvent.emit();
    this.colorForm.reset();
  }
}
