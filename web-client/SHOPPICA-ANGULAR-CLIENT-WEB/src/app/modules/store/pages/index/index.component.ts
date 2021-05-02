import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@core/model/store/store';
import { ShareService } from '@core/services/share/share.service';
import { StoreInfoService } from '@core/services/store-info/store-info.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }



}
