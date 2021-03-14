import { BaseParams } from './../../../common/base-params';
import { BaseList } from '@modules/common/base-list';
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
export class SizeListComponent extends BaseList<Size> implements OnInit {
  constructor(private readonly sizeService: SizeService) {
    super(sizeService);
  }

  ngOnInit(): void {
  }
}
