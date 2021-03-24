import { Component, OnInit } from '@angular/core';
import {
  ChartDataSets,
  ChartOptions,
  ChartType,
  RadialChartOptions,
} from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { DashboardService } from '../../services/dashboard-service';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { State } from '../../models/state';
import { Category } from '@app/modules/category/models/category';
import { CategoryReport } from '../../models/category';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  revenue: number;
  order: number;
  reviews: number;
  customer: number;
  time: string;
  state: State;
  isLoading = true;
  category: CategoryReport[];
  revenues: number[];
  sales: number[];
  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // const currentMonth = moment().format('M');
    const fromDate = moment().startOf('month').format('YYYY-MM-DD');
    const toDate = moment().endOf('month').format('YYYY-MM-DD');
    this.dashboardService
      .getData(fromDate, toDate, 1000)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((res) => {
        const data = res.data;
        this.revenue = data.revenue;
        this.order = data.order;
        this.reviews = data.reviews;
        this.customer = data.customer;
        this.time = 'Current month';
        this.state = data.state;
        this.category = data.category;
        this.revenues = data.revenues;
        this.sales= data.sales;
      });
  }
}
