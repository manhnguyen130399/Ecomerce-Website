import { Component, OnInit } from '@angular/core';
import { BaseList } from '@modules/common/base-list';
import { Color } from '@modules/color/models/Color';
import { ColorService } from '@modules/color/services/color.service';
@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css'],
})
export class ColorListComponent extends BaseList<Color> implements OnInit {

  constructor(private readonly colorService: ColorService) {
    super(colorService);
  }

  ngOnInit(): void {
  }
}
