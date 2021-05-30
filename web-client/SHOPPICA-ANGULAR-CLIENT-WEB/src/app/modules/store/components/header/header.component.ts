import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '@shared/modules/loader/loader.service';
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
  constructor(
    private readonly storeService: StoreService,
    private readonly loaderService: LoaderService,
    private readonly activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.storeId = param.storeId;
      console.log(param);

    });
    this.loadStoreDataInfo();


  }

  loadStoreDataInfo() {
    this.loaderService.showLoader('global-store');
    this.storeService.getStoreById(this.storeId)
      .pipe(finalize(() => this.loaderService.hideLoader('global-store')))
      .subscribe((res) => {
        this.store = res.data;
      });
  }

}
