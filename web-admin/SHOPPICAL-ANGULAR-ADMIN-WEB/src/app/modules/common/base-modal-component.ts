import { Input, Output, EventEmitter, Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { finalize } from "rxjs/operators";
import { BaseService } from "./base-service";

export class BaseModalComponent<T> {
  baseForm: FormGroup;
  isLoadingButton = false;
  isEditMode = false;

  constructor(private readonly baseService: BaseService<T>) {
  }

  create(data: T, okModalEvent: EventEmitter<T>, messageService: NzMessageService) {
    this.isLoadingButton = true;
    this.baseService
      .create(data)
      .pipe(finalize(() => (this.isLoadingButton = false)))
      .subscribe((res) => {
        if (res.code == 'OK') {
          messageService.create('success', `Create successfully!`);
          okModalEvent.emit(res.data);
          this.baseForm.reset();
        }
      });
  }

  cancel(cancelModalEvent: EventEmitter<string>): void {
    cancelModalEvent.emit();
    this.baseForm.reset();
  }
}
