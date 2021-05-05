import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-toolbars',
  templateUrl: './toolbars.component.html',
  styleUrls: ['./toolbars.component.css']
})
export class ToolbarsComponent implements OnInit {

  numOnePage = 4;
  prevWidth = window.innerWidth;
  @Output() openFilterDrawerEvent = new EventEmitter<boolean>();
  @Output() changeNumberProductEvent = new EventEmitter<number>();
  @Output() sortChangeValueEvent = new EventEmitter<string>();
  selectedProvince: string;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.prevWidth > 992 && event.target.innerWidth <= 992) {
      this.viewProduct(2);
    }
    else if (this.prevWidth < 992 && event.target.innerWidth > 992) {
      this.viewProduct(4);
    }
    this.prevWidth = event.target.innerWidth;
  }
  constructor() { }

  ngOnInit(): void {

  }

  openFilterDrawer() {
    this.openFilterDrawerEvent.emit();
  }

  viewProduct(numProductOnePage: number) {
    this.numOnePage = numProductOnePage;
    this.changeNumberProductEvent.emit(numProductOnePage);
  }

  provinceChange(value: string): void {
    console.log(value);
    this.sortChangeValueEvent.emit(value);
  }
}
