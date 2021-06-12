import { StorageService } from '@core/services/storage/storage.service';
import { Address } from '@core/model/address/address';
import { ShippingAddress } from './../../../../core/model/user/shipping-address';
import { Customer } from '@core/model/user/customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartItem } from '@core/model/cart/cart-item';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { GhnService } from '@core/services/ghn/ghn.service';
import { ShareService } from '@core/services/share/share.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { combineLatest } from 'rxjs';
import { environment } from '@env';
import { CheckoutService } from '@core/services/checkout/checkout.service';

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
  customer: Customer;
  shippingAddress: ShippingAddress;
  isLoading = false;
  districtSelectedId = 0;
  wardSelectedId = '-1';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly storageService: StorageService,
    private readonly ghnService: GhnService,
    private readonly router: Router,
    private readonly shareService: ShareService,
    private readonly checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.shippingAddress = this.storageService.getValue<ShippingAddress>(environment.shippingAddressKey);

    combineLatest([
      this.ghnService.getProvinces(),
      this.shareService.customerInfoEmitted$
    ]).subscribe(res => {
      if (res[0].code === 200) {
        this.listProvince = res[0].data;
      }
      this.customer = this.shippingAddress ? this.shippingAddress : res[1];
      this.setFormValue();
    });

    this.checkoutService.stepChange(1);
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
    });
  }

  setFormValue() {
    if (this.customer?.address) {
      this.districtSelectedId = this.customer.address.districtId;
      this.wardSelectedId = this.customer.address.wardId;
      const province = this.listProvince.find(x => x.ProvinceID == this.customer.address.provinceId);
      const apartment = this.customer.address.addressName.split('-')[0];
      this.orderForm.controls.province.setValue(province);
      this.orderForm.controls.apartment.setValue(apartment);
    }
    this.orderForm.controls.customerName.setValue(this.customer?.customerName);
    this.orderForm.controls.phone.setValue(this.customer?.phone);
    this.orderForm.controls.email.setValue(this.customer?.email);
  }

  provinceChange(province): void {
    this.loadDistricts(province.ProvinceID);
  }

  districtChange(district): void {
    this.loadWards(district.DistrictID);
  }

  loadDistricts(provinceID: number) {
    this.ghnService.getDistricts(provinceID).subscribe(res => {
      if (res.code === 200) {
        this.listDistrict = res.data;
        const district = this.districtSelectedId !== 0 ? this.listDistrict.find(x => x.DistrictID === this.districtSelectedId) : this.listDistrict[0];
        this.orderForm.controls.district.setValue(district);
        this.districtSelectedId = 0;
      }
    });
  }

  loadWards(districtID: number) {
    this.ghnService.getWards(districtID).subscribe(res => {
      if (res.code === 200) {
        this.listWard = res.data;
        const ward = this.wardSelectedId !== '-1' ? this.listWard.find(x => x.WardCode == this.wardSelectedId) : this.listWard[0];
        this.orderForm.controls.ward.setValue(ward);
        this.wardSelectedId = '-1';
      }
    });
  }

  gotoShipping() {
    const province = this.orderForm.get('province').value;
    const district = this.orderForm.get('district').value;
    const ward = this.orderForm.get('ward').value;
    const apartment = this.orderForm.get('apartment').value;
    const address: Address = {
      provinceId: province.ProvinceID,
      districtId: district.DistrictID,
      wardId: ward.WardCode,
      addressName: `${apartment} - ${ward.WardName} - ${district.DistrictName} - Tỉnh ${province.ProvinceName}`
    };

    const shippingAddress: ShippingAddress = {
      customerName: this.orderForm.get('customerName').value,
      phone: this.orderForm.get('phone').value,
      email: this.orderForm.get('email').value,
      address
    };

    this.storageService.setObject(environment.shippingAddressKey, shippingAddress);

    this.router.navigate(['/checkout/payment']);
  }
}
