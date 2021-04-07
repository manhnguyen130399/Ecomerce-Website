import { Category } from '@core/model/category';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-descriptions',
  templateUrl: './descriptions.component.html',
  styleUrls: ['./descriptions.component.css']
})
export class DescriptionsComponent implements OnInit {

  @Input() categorySelected: Category;
  constructor() { }

  ngOnInit(): void {
  }

}
