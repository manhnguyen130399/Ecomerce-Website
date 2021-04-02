import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-drawer',
  templateUrl: './menu-drawer.component.html',
  styleUrls: ['./menu-drawer.component.css']
})
export class MenuDrawerComponent implements OnInit {

  @Input() isOpenMenuDrawer: boolean = false;
  @Output() closeMenuDrawer = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  closeMenu(): void {
    this.closeMenuDrawer.emit(false);
  }
}
