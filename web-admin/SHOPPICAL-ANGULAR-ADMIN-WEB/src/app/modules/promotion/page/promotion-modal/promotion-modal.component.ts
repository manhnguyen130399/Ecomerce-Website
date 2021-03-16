import { PromotionService } from './../../services/promotion.service';
import { BaseModalComponent } from '@app/modules/common/base-modal-component';
import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Promotion } from '@app/modules/promotion/model/promotion';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-promotion-modal',
  templateUrl: './promotion-modal.component.html',
  styleUrls: ['./promotion-modal.component.css']
})
export class PromotionModalComponent extends BaseModalComponent<Promotion> implements OnInit {

  @Input() isVisible = false;
  @Input() modalTitle = "Add promotion";
  @Input() promotionObject: Promotion;
  @Output() cancelModalEvent = new EventEmitter<string>();
  @Output() okModalEvent = new EventEmitter<Promotion>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly promotionService: PromotionService,
    private readonly messageService: NzMessageService,
    private datePipe: DatePipe) {
    super(promotionService);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.baseForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      code: [null, [Validators.required]],
      date: [null, [Validators.required]],
      discount: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      numUse: [null, [Validators.required, Validators.min(0)]],
      type: [null, [Validators.required]],
    })
  }

  submitForm() {
    let promotion = {
      id: null,
      qrCode: null,
      title: this.baseForm.get("title").value,
      code: this.baseForm.get("code").value,
      discount: this.baseForm.get("discount").value,
      condition: {
        numUse: this.baseForm.get("numUse").value,
        promotionType: this.baseForm.get("type").value,
      },
      startDate: this.datePipe.transform(this.baseForm.get("date").value[0], "yyyy-MM-dd"),
      endDate: this.datePipe.transform(this.baseForm.get("date").value[1], "yyyy-MM-dd"),
    }
    super.create(promotion, this.okModalEvent, this.messageService);
  }

  cancelModal(): void {
    super.cancel(this.cancelModalEvent);
  }

  generateCode() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.baseForm.controls.code.setValue(result);
  }

}
