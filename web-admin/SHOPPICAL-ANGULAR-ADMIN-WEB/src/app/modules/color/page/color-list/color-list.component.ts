import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '@app/modules/common/base-list-component';
import { Color } from '@modules/color/models/Color';
import { ColorService } from '@modules/color/services/color.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css'],
})
export class ColorListComponent extends BaseListComponent<Color> implements OnInit {

  constructor(private readonly colorService: ColorService) {
    super(colorService);
  }

  ngOnInit(): void {
  }

  searchByName() {
    this.baseParams.filters = [{ key: "colorName", value: this.searchValue }];
    super.search();
  }

  onQueryParamsChange = (params: NzTableQueryParams) => {
    this.baseParams.filters = [{ key: "sizeName", value: this.searchValue }];
    super.onQueryParamsChangeFromParent(params);
  }
}
