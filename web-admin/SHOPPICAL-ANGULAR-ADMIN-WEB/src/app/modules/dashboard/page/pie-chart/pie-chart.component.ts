import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { State } from '../../models/state';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  @Input() chartTitle: string;
  @Input() state: State;
  pieChartData: number[];

  constructor() {}

  ngOnInit(): void {
    if (this.state != null) {
      this.pieChartData = [
        this.state.complete,
        this.state.pending,
        this.state.complete,
        this.state.delivery,
      ];
    } else {
      this.pieChartData = [0, 0, 0, 0];
    }
  }

  pieChartOptions: ChartOptions = {
    maintainAspectRatio: false,
  };
  pieChartLabels: Label[] = [
    ['Completed'],
    ['Pending'],
    ['Cancel'],
    ['Delivery'],
  ];

  // pieChartData: number[] = [300, 200, 500, 100];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [
    {
      backgroundColor: [
        'rgba(56, 229, 73, 0.98)',
        'rgba(72, 132, 222, 0.89)',
        'rgba(215, 84, 69, 0.89)',
        'rgba(211,33,54,0.98)',
      ],
    },
  ];
}
