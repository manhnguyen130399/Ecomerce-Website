import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@core/model/store/store';
import { ShareService } from '@core/services/share/share.service';
import { StoreInfoService } from '@core/services/store-info/store-info.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private readonly storeService: StoreInfoService, private readonly shareService: ShareService) { }

  @Input() id: number = 50;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadStoreInfo()
  }

  loadStoreInfo() {
    this.storeService.getStoreInfoById(this.id).subscribe((res) => {
      this.shareService.storeInfoSuccessEvent(res.data)
      this.isLoading = false;
    })
  }

}
