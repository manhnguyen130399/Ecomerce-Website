import { Color } from '../../../../../core/model/color/color';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.css']
})
export class SelectColorComponent implements OnInit {
  @Input() listColor: Color[];
  @Input() colorSelected: Color;
  @Output() colorSelectedChange = new EventEmitter<Color>();
  @Input() showTitle: boolean;
  @Input() size: string;

  constructor() { }

  ngOnInit(): void {
  }

  selectColor(color: Color) {
    this.colorSelected = color;
    this.colorSelectedChange.emit(this.colorSelected);
  }
}
