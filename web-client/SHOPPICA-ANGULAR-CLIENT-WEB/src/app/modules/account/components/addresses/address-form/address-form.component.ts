import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  addressForm: FormGroup;
  listProvince = [];
  listDistrict = [];
  listWard = [];
  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }
  buildForm() {
    this.addressForm = this.formBuilder.group({
      customerName: [null, Validators.required],
      phone: [null, Validators.required],
      province: [null, Validators.required],
      ward: [null, Validators.required],
      district: [null, Validators.required],
      apartment: [null, Validators.required],
    })
  }

  provinceChange(id: number) {

  }

  districtChange(id: number) {

  }
}
