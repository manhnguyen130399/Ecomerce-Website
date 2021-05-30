import { finalize } from 'rxjs/operators';
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
  @Input() isVisible = false;
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<Color>();
  colorCode: string = '#fbfbfb';
  modalTitle = 'ADD COLOR';
  colors: Color[] = [];
  disable = false;
  isLoadingColorInSelect = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly colorService: ColorService,
    private readonly chileMessageService: NzMessageService
  ) {
    super(colorService);
  }

  ngOnInit(): void {
    this.buildForm();
    this.getColorAllStore();
  }

  buildForm() {
    this.baseForm = this.formBuilder.group({
      colorName: [null, Validators.required],
      colorCode: ['#fbfbfb', Validators.required],
    });
  }

  getColorAllStore() {
    this.isLoadingColorInSelect = true;
    this.colorService.getColorAllStore().pipe(
      finalize(() => this.isLoadingColorInSelect = false)
    ).subscribe(res => {
      if (res.code === 'OK') {
        this.colors = res.data;
      }
    })
  }

  submitForm() {
    let color = {
      colorName: this.baseForm.get('colorName').value.colorName,
      colorCode: this.colorCode,
    };

    super.create(color, this.okModalEvent, this.chileMessageService);
    this.enableColorPicker();
    this.getColorAllStore();
  }

  disableColorPicker() {
    this.baseForm.controls.colorCode.disable();
    this.disable = true;
  }

  enableColorPicker() {
    this.baseForm.controls.colorCode.enable();
    this.disable = false;
    this.baseForm.controls.colorCode.setValue('#fbfbfb');
    this.colorCode = '#fbfbfb';
  }

  cancelModal() {
    super.cancel(this.cancelModalEvent);
  }

  changeColor(color: Color) {
    if (color.id !== -1) {
      this.colorCode = color.colorCode;
      this.disableColorPicker();
    }
    else {
      this.enableColorPicker();
    }
  }

  addItem(input: HTMLInputElement): void {
    if (this.colors.findIndex(x => x.colorName == input.value) === -1 && input.value) {
      this.colors = [...this.colors, { id: -1, colorName: input.value, colorCode: '#ffffff' }];
      input.value = null;
    }
  }
}
