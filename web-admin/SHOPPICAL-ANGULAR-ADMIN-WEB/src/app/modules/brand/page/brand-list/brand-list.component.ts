import { BrandService } from '@modules/brand/services/brand.service';
import { Brand } from '@modules/brand/models/brand';
import { BaseListComponent } from '@app/modules/common/base-list-component';
import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { UtilitiesService } from '@app/core/services/utilities/utilities.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent extends BaseListComponent<Brand> implements OnInit {

  constructor(
    private readonly brandService: BrandService, private readonly utilitiesService: UtilitiesService) {
    super(brandService);
  }

  ngOnInit(): void {
    this.isAdmin = this.utilitiesService.getRole() === 'Admin';
  }

  searchByName() {
    this.baseParams.filters = [{ key: "brandName", value: this.searchValue }];
    super.search();
  }

  onQueryParamsChange = (params: NzTableQueryParams) => {
    this.baseParams.filters = [{ key: "brandName", value: this.searchValue }];
    super.onQueryParamsChangeFromParent(params);
  }
}
