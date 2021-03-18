import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '@app/modules/common/base-list-component';
import { Complain } from '../../models/complain';
import { ComplainService } from '../../service/complain.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-complain-list',
  templateUrl: './complain-list.component.html',
  styleUrls: ['./complain-list.component.css'],
})
export class ComplainListComponent
  extends BaseListComponent<Complain>
  implements OnInit {
  constructor(private readonly complainService: ComplainService) {
    super(complainService);
  }

  ngOnInit(): void {}

  onQueryParamsChange = (params: NzTableQueryParams) => {
    super.onQueryParamsChangeFromParent(params);
  };

  replyComplain(id: number) {
    this.complainService.changeSource(id);
    super.showModal();
  }

  search() {
    this.baseParams.filters = [{ key: 'keyword', value: this.searchValue }];
    super.search();
  }
}
