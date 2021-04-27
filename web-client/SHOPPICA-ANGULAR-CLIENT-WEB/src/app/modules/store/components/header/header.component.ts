import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@core/model/store/store';
import { ShareService } from '@core/services/share/share.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  store: Store;
  constructor(private readonly shareService: ShareService) { }

  ngOnInit(): void {
    this.shareService.loadStoreInfoSEmitted$.subscribe(it => this.store = it)
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
