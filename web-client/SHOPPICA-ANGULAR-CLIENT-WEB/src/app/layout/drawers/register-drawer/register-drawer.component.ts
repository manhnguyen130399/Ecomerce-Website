import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-drawer',
  templateUrl: './register-drawer.component.html',
  styleUrls: ['./register-drawer.component.css']
})
export class RegisterDrawerComponent implements OnInit {
  @Input() isOpenRegisterDrawer: boolean = false;
  @Output() closeRegisterDrawerEvent = new EventEmitter<boolean>();
  @Output() openLoginDrawerEvent = new EventEmitter<boolean>();
  registerForm: FormGroup;
  isLoading = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      fullName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  closeMenu(): void {
    this.closeRegisterDrawerEvent.emit();
  }

  openLoginDrawer() {
    this.openLoginDrawerEvent.emit();
  }

}
