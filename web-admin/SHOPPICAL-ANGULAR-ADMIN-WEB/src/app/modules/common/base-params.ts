import { Filter } from "./filter";

export class BaseParams {
  pageSize: number;
  pageIndex: number;
  filters: Filter[];
  sortField: string;
  sortOrder: string;

  constructor() {
    this.pageIndex = 1;
    this.pageSize = 5;
    this.filters = [];
    this.sortField = null;
    this.sortOrder = null;
  }
}
