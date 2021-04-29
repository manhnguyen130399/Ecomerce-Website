import { Component, OnInit, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Input() loading: boolean = false;
  @Input() background: string = "#ffffff";
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChange) {
    //logging the changes in @Input()
  }

}
