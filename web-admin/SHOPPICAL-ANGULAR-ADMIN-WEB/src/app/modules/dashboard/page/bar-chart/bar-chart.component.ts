import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  @Input() chartTitle: string;
  @Input() revenues: number[];
  barChartData: ChartDataSets[];
  constructor() {}

  ngOnInit(): void {
    this.barChartData = [{ data: this.revenues, label: 'Revenue' }];
  }

  barChartLabels: Label[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartOptions: ChartOptions = {
    maintainAspectRatio: false,
  };

  barChartColors: Color[] = [
    {
      backgroundColor: '#82c5f0',
      borderColor: 'blue',
    },
  ];
}
