import { ShareService } from './../../../../core/services/share/share.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { tap, finalize } from 'rxjs/operators';
import { Customer } from '@core/model/user/customer';
import { AuthService } from '@core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  updateInfoForm: FormGroup;
  customer: Customer;
  isLoading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly messageService: NzMessageService,
    private readonly router: Router,
    private readonly shareService: ShareService
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.shareService.customerInfoEmitted$.subscribe(customer => {
      if (customer) {
        this.customer = customer;
        this.setFormValue();
      }
    });
  }

  setFormValue() {
    if (this.customer) {
      this.updateInfoForm.controls.customerName.setValue(this.customer.customerName);
      this.updateInfoForm.controls.email.setValue(this.customer.email);
      this.updateInfoForm.controls.phone.setValue(this.customer.phone);
      this.updateInfoForm.controls.gender.setValue(this.customer.gender);
    }
  }

  buildForm() {
    this.updateInfoForm = this.formBuilder.group({
      customerName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
  }

  updateInfo() {
    const request = {
      ...this.updateInfoForm.value
    };
    this.isLoading = true;

    this.authService.updateInfo(request).pipe(
      tap(result => {
        if (result.isSuccessed) {
          this.messageService.success('Update information successfully!');
          this.router.navigate(['/account']);

        }
        else {
          this.updateInfoForm.setErrors({ error: result.message });
        }
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }
}
