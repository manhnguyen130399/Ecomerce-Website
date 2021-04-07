import { Brand } from './../../../../core/model/brand';
import { Size } from '@core/model/size';
import { Color } from './../../../../core/model/color';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.css']
})
export class FilterDrawerComponent implements OnInit {

  @Input() isShowFilter = false;
  @Output() closeFilterEvent = new EventEmitter<boolean>();

  listColor: Color[] = [
    {
      id: 1,
      colorName: "Green",
      colorCode: "Green"
    },
    {
      id: 2,
      colorName: "Gray",
      colorCode: "Gray"
    },
    {
      id: 3,
      colorName: "Pink",
      colorCode: "Pink"
    },
    {
      id: 4,
      colorName: "Blue",
      colorCode: "Blue"
    },
    {
      id: 5,
      colorName: "Brown",
      colorCode: "Brown"
    },
    {
      id: 6,
      colorName: "While",
      colorCode: "While"
    },
  ]

  listSize: Size[] = [
    {
      id: 1,
      sizeName: "M"
    },
    {
      id: 2,
      sizeName: "S"
    },
    {
      id: 3,
      sizeName: "L"
    },
    {
      id: 4,
      sizeName: "XL"
    },
    {
      id: 5,
      sizeName: "XXL"
    },
  ]

  listBrand: Brand[] = [
    {
      id: 1,
      brandName: "Nike"
    },
    {
      id: 2,
      brandName: "H&M"
    },
    {
      id: 3,
      brandName: "Kalles"
    },
    {
      id: 4,
      brandName: "Monki"
    },
    {
      id: 5,
      brandName: "Adidas"
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

  closeMenu() {
    this.closeFilterEvent.emit();
  }
}
