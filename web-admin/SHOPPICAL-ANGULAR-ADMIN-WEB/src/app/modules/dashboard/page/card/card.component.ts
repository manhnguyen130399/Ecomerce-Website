import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() category: string;
  @Input() number: number;
  @Input() time: string;
  @Input() iconStyle: { [key: string]: any };
  @Input() iconName: string;
  constructor() {}

  ngOnInit(): void {}
}
