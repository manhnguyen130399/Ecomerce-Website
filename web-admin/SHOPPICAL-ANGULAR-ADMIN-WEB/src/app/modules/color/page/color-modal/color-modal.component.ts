import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseModalComponent } from '@app/modules/common/base-modal-component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Color } from '../../models/Color';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color-modal',
  templateUrl: './color-modal.component.html',
  styleUrls: ['./color-modal.component.css'],
})
export class ColorModalComponent
  extends BaseModalComponent<Color>
  implements OnInit {
  @Input() color: Color;
  @Input() modalTitle: string;
  @Input() isVisible = false;
  colorCode: string = '#fbfbfb';
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<Color>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly colorService: ColorService,
    private readonly chileMessageService: NzMessageService
  ) {
    super(colorService);
  }

  ngOnInit(): void {
    this.modalTitle = 'Create color';
    this.buildForm();
  }

  buildForm() {
    this.baseForm = this.formBuilder.group({
      colorName: [null],
    });
  }

  submitForm() {
    let color = {
      id: null,
      colorName: this.baseForm.get('colorName').value.trim(),
      colorCode: this.colorCode,
    };
    super.create(color, this.okModalEvent, this.chileMessageService);
  }

  cancelModal() {
    super.cancel(this.cancelModalEvent);
  }
  updateColor(event) {
    this.colorCode = event;
  }
}
