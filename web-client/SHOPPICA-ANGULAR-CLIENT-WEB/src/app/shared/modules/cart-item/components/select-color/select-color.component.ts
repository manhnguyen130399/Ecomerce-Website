import { Color } from './../../../../../core/model/color';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.css']
})
export class SelectColorComponent implements OnInit {
  @Input() listColor: Color[];
  @Input() showTitle: boolean;
  @Input() size: string;
  @Output() listColorChange = new EventEmitter<Color[]>();

  colorSelected: Color;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listColor !== undefined) {
      let selectColor = changes.listColor.currentValue.filter(color => color.isSelected);

      if (selectColor.length === 0) {
        this.selectColor(changes.listColor.currentValue[0]);
      }
      else {
        this.colorSelected = changes.listColor.currentValue[0];
      }
    }
  }

  selectColor(color: Color) {
    this.colorSelected = color;
    this.listColor.forEach(color => color.isSelected = false);
    color.isSelected = true;
    this.listColorChange.emit(this.listColor);
  }
}
