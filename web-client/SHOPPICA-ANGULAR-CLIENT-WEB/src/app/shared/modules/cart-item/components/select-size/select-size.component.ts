import { Size } from '@core/model/size';
import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-select-size',
  templateUrl: './select-size.component.html',
  styleUrls: ['./select-size.component.css']
})
export class SelectSizeComponent implements OnInit {

  @Input() listSize: Size[];
  @Output() listSizeChange = new EventEmitter<Size[]>();
  sizeSelected: Size;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listSize !== undefined) {
      let selectSize = changes.listSize.currentValue.filter(color => color.isSelected);

      if (selectSize.length === 0) {
        this.selectSize(changes.listSize.currentValue[0]);
      }
      else {
        this.sizeSelected = changes.listSize.currentValue[0];
      }
    }
  }

  selectSize(size: Size) {
    this.sizeSelected = size;
    this.listSize.forEach(size => size.isSelected = false);
    size.isSelected = true;
    this.listSizeChange.emit(this.listSize);
  }
}
