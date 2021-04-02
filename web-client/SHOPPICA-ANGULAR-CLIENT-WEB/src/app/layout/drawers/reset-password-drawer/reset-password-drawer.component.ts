import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password-drawer',
  templateUrl: './reset-password-drawer.component.html',
  styleUrls: ['./reset-password-drawer.component.css']
})
export class ResetPasswordDrawerComponent implements OnInit {
  @Input() isOpenResetPasswordDrawer: boolean = false;
  @Output() closeResetPasswordDrawerEvent = new EventEmitter<boolean>();
  @Output() openLoginDrawerEvent = new EventEmitter<boolean>();
  resetPasswordForm: FormGroup;
  isLoading = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.resetPasswordForm = this.formBuilder.group({
      email: [null, Validators.required],
    })
  }

  closeMenu(): void {
    this.closeResetPasswordDrawerEvent.emit(false);
  }

  openLoginDrawer() {
    this.openLoginDrawerEvent.emit();
  }
}
