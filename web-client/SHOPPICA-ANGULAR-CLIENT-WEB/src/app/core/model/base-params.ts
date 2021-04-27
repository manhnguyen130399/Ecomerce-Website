export class BaseParams {
  pageSize: number;
  pageIndex: number;

  constructor(pageIndex: number, pageSize: number) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
  }
}
