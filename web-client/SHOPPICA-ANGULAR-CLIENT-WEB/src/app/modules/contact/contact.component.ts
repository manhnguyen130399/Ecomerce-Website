import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../core/services/contact/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  isLoading: true;
  contactForm!: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly contactService: ContactService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null],
      content: [null, Validators.required],
    });
  }

  submitForm() {
    this.checkInput();
    const value = this.contactForm.value;
    if (this.contactForm.valid) {
      this.contactService
        .createContact(this.contactForm.value)
        .subscribe((res) => {
          if (res.code == 'OK') {
            this.contactForm.reset();
            this.router.navigate(['/home']);
          }
        });
    }
  }

  checkInput() {
    for (const i in this.contactForm.controls) {
      this.contactForm.controls[i].markAsDirty();
      this.contactForm.controls[i].updateValueAndValidity();
    }
  }
}
