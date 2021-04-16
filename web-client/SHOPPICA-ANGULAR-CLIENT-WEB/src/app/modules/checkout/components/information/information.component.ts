import { StepsService } from './../../services/steps.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartItem } from './../../../../core/model/cart-item';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  orderForm: FormGroup;
  listProvince = [];
  listDistrict = [];
  listWard = [];
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly stepService: StepsService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.stepService.changeStep(2);
  }


  buildForm() {
    this.orderForm = this.formBuilder.group({
      customerName: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      province: [null, Validators.required],
      ward: [null, Validators.required],
      district: [null, Validators.required],
      apartment: [null, Validators.required],
    })
  }

  provinceChange(data) {

  }

  districtChange(data) {

  }
}
