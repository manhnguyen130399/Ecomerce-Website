import { Component, OnInit, Input } from '@angular/core';
import { RadialChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit {

  @Input() chartTitle;
  radarChartOptions: RadialChartOptions = {
    maintainAspectRatio: false,
  };
  radarChartLabels: Label[] = ['Clothing', 'Shoes', 'Jackets', 'T-Shirt', 'Dress', 'Bags', 'Accessories'];

  radarChartData: ChartDataSets[] = [
    { data: [65, 59, 44, 61, 56, 55, 40], label: 'Category' },
  ];
  radarChartType: ChartType = 'radar';

  constructor() { }

  ngOnInit(): void {
  }

}
