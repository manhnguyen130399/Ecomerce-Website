import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipping-calculator',
  templateUrl: './shipping-calculator.component.html',
  styleUrls: ['./shipping-calculator.component.css']
})
export class ShippingCalculatorComponent implements OnInit {
  selectedProvince = 'Zhejiang';
  provinceData = ['Zhejiang', 'Jiangsu'];
  constructor() { }

  ngOnInit(): void {
  }

  provinceChange(value: string): void {

  }
}
