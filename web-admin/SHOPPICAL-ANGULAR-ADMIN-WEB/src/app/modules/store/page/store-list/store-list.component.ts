import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../service/store.service';
import { BaseListComponent } from '@app/modules/common/base-list-component';
import { Store } from '../../models/store';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css'],
})
export class StoreListComponent
  extends BaseListComponent<Store>
  implements OnInit {
  constructor(private readonly storeService: StoreService) {
    super(storeService);
  }

  pageIndex =0;
  pageSize =5;

  ngOnInit(): void {}

  searchByName() {
    this.baseParams.filters = [{ key: "storeName", value: this.searchValue }];
    super.search();
  }

  onQueryParamsChange = (params: NzTableQueryParams) => {
    this.baseParams.filters = [{ key: "storeName", value: this.searchValue }];
    super.onQueryParamsChangeFromParent(params);
  }
}
