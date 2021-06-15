import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard-service';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { State } from '../../models/state';
import { CategoryReport } from '../../models/category';
import { saveAs } from 'file-saver';
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
  downloading = false;
  category: CategoryReport[];
  revenues: number[];
  sales: number[];
  date = null;
  from: string = moment().startOf('month').format('YYYY-MM-DD');
  to: string = moment().endOf('month').format('YYYY-MM-DD');
  constructor(private readonly dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadData();
  }

  onChange(result: Date[]): void {
    this.isLoading = true;
    this.getData(
      this.from = moment(result[0]).format('YYYY-MM-DD'),
      this.to = moment(result[1]).format('YYYY-MM-DD')
    );
  }

  loadData() {
    this.isLoading = true;
    this.getData(this.from, this.to);
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
        this.time = moment(from).format("M") == moment().startOf('month').format('M') && moment(from).format("M") == moment().endOf('month').format('M') ? 'Current Month' : moment(from).format("MMMM")
        this.state = data.state;
        this.category = data.category;
        this.revenues = data.revenues;
        this.sales = data.sales;
      });
  }

  exportExcel() {
    this.downloading = true;
    this.dashboardService.exportExcel(this.from, this.to, 1000).pipe(
      finalize(() => this.downloading = false)
    ).subscribe((res) => {
      saveAs(res, `Report ${this.from} - ${this.to}.xls`);
    })
  }

}
