import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() chartTitle: string;
  constructor() { }

  ngOnInit(): void {
  }

  pieChartOptions: ChartOptions = {
    maintainAspectRatio: false,
  };
  pieChartLabels: Label[] = [['Completed'], ['Progressing'], 'Cancel'];
  pieChartData: number[] = [300, 500, 100];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [
    {
      backgroundColor: ['rgba(56, 229, 73, 0.98)', 'rgba(72, 132, 222, 0.89)', 'rgba(215, 84, 69, 0.89)'],
    },
  ];
}
