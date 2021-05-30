import { BaseParams } from './../../../common/base-params';
import { BaseListComponent } from '@app/modules/common/base-list-component';
import { finalize } from 'rxjs/operators';
import { SizeService } from './../../services/size.service';
import { Component, OnInit } from '@angular/core';
import { Size } from '../../models/size';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-size-list',
  templateUrl: './size-list.component.html',
  styleUrls: ['./size-list.component.css']
})
export class SizeListComponent extends BaseListComponent<Size> implements OnInit {
  constructor(private readonly sizeService: SizeService) {
    super(sizeService);
  }

  ngOnInit(): void {
  }

  searchByName() {
    this.baseParams.filters = [{ key: "sizeName", value: this.searchValue }];
    super.search();
    console.log(this.listData);

  }

  onQueryParamsChange = (params: NzTableQueryParams) => {
    this.baseParams.filters = [{ key: "sizeName", value: this.searchValue }];
    super.onQueryParamsChangeFromParent(params);
  }

}
