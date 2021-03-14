import { BrandService } from '@modules/brand/services/brand.service';
import { Brand } from '@modules/brand/models/brand';
import { BaseList } from '@modules/common/base-list';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent extends BaseList<Brand> implements OnInit {
  constructor(
    private readonly brandService: BrandService) {
    super(brandService);
  }

  ngOnInit(): void {
  }
}
