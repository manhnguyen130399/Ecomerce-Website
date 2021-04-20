import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  isLoading: true;
  contactForm: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly contactService: ContactService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null],
      message: [null, Validators.required],
    });
  }

  submitForm() {
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
