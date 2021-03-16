import { PromotionService } from './../../services/promotion.service';
import { BaseListComponent } from '@app/modules/common/base-list-component';
import { Component, OnInit } from '@angular/core';
import { Promotion } from '../../model/promotion';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.css']
})
export class PromotionListComponent extends BaseListComponent<Promotion> implements OnInit {

  constructor(private readonly promotionService: PromotionService) {
    super(promotionService);
  }

  ngOnInit(): void {
  }

  searchByName() {
    this.baseParams.filters = [{ key: "title", value: this.searchValue }];
    super.search();
  }

  onQueryParamsChange = (params: NzTableQueryParams) => {
    this.baseParams.filters = [{ key: "title", value: this.searchValue }];
    super.onQueryParamsChangeFromParent(params);
  }
}
