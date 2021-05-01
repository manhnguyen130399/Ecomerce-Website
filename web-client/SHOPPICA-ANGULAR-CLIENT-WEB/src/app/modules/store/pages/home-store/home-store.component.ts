import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@core/model/store/store';
import { ShareService } from '@core/services/share/share.service';
import { StoreInfoService } from '@core/services/store-info/store-info.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home-store',
  templateUrl: './home-store.component.html',
  styleUrls: ['./home-store.component.css']
})
export class HomeStoreComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private readonly shareService: ShareService, private readonly router: ActivatedRoute) {
    this.router.params.subscribe(params => {
      this.shareService.storeInfoSuccessEvent(params.id)
    });
  }

  ngOnInit(): void {

  }

}
