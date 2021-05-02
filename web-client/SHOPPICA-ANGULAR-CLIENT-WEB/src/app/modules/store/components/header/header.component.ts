import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@core/model/store/store';
import { ShareService } from '@core/services/share/share.service';
import { StoreService } from '@core/services/store/store.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  store: Store;
  storeId: number;
  isLoading: boolean = true;
  constructor(private readonly shareService: ShareService, private readonly storeService: StoreService) {
    this.shareService.loadStoreInfoSEmitted$.subscribe((res) => {
      this.storeId = res;
    })
  }

  ngOnInit(): void {
    this.loadStoreDataInfo()

  }

  loadStoreDataInfo() {
    this.storeService.getStoreById(this.storeId).pipe(finalize(() => this.isLoading = false)).subscribe((res) => {
      this.store = res.data;
    })
  }

}
