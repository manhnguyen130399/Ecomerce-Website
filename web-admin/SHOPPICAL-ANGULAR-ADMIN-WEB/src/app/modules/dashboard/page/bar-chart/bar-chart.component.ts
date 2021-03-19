import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() chartTitle: string;
  constructor() { }

  ngOnInit(): void {
  }

  barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartDataSets[] = [
    { data: [65, 59, 50, 51, 56, 55, 40, 21], label: 'Series A' },
  ];

  barChartOptions: (ChartOptions) = {
    maintainAspectRatio: false,
  }

  barChartColors: Color[] = [
    {
      backgroundColor: '#82c5f0',
      borderColor: 'blue',
    },
  ];

}
