import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard-service';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { State } from '../../models/state';
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
  isLoading = false;
  category: CategoryReport[];
  revenues: number[];
  sales: number[];
  date = null;
  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadData();
  }

  onChange(result: Date[]): void {
    this.isLoading = true;
    this.getData(
      moment(result[0]).format('YYYY-MM-DD'),
      moment(result[1]).format('YYYY-MM-DD')
    );
  }

  loadData() {
    this.isLoading = true;
    const fromDate = moment().startOf('month').format('YYYY-MM-DD');
    const toDate = moment().endOf('month').format('YYYY-MM-DD');
    this.getData(fromDate, toDate);
  }

  private getData(from, to) {
    this.dashboardService
      .getData(from, to, 1000)
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
        this.sales = data.sales;
      });
  }
}
