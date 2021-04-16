import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  isLoading: true;
  contactForm: FormGroup;
  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.contactForm = this.formBuilder.group(
      {
        name: [null, Validators.required],
        email: [null, Validators.required],
        phone: [null, Validators.required],
        message: [null, Validators.required],
      }
    )

  }

  submitForm() {

  }
}
