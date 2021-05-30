import { NzTableQueryParams } from "ng-zorro-antd/table";
import { finalize } from "rxjs/operators";
import { BaseModel } from "./base-model";
import { BaseParams } from "./base-params";
import { BaseService } from "./base-service";

export class BaseListComponent<T extends BaseModel> {
  isShowModal = false;
  isLoading = false;
  isShowSearchInput = false;
  total = 1;
  searchValue = '';
  baseParams = new BaseParams();
  isAdmin :boolean = false;

  listData: T[] = [];
  selectedData: T;

  constructor(private readonly baseService: BaseService<T>) {
  }

  showModal() {
    this.isShowModal = true;
  }

  closeModal(data: T) {
    if (data == null) {
      this.isShowModal = false;
      return null;
    }

    const isLastPage = Math.floor(this.total / this.baseParams.pageSize) + 1 == this.baseParams.pageIndex;
    // is sort descend
    if (this.baseParams.sortField == "id" && this.baseParams.sortOrder == "descend") {
      this.listData.unshift(data);
      if (this.listData.length >= this.baseParams.pageSize) {
        this.listData.pop();
      }
    }
    // is last page and numRow < pageSize
    else if (isLastPage && this.listData.length < this.baseParams.pageSize) {
      this.listData.push(data);
    }
    this.total++;
    this.isShowModal = false;
  }

  edit(data) {
    this.selectedData = data;
    this.isShowModal = true;
  }

  delete(id: number) {
    this.isLoading = true;
    this.baseService.delete(id, this.baseParams).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      if (res.code == "OK") {
        this.total--;
        this.listData = this.listData.filter(val => val.id !== id);
        if (Math.floor(this.total / this.baseParams.pageSize) + 1 != this.baseParams.pageIndex) {
          this.listData.push(res.data);
        }
      }
    });
  }

  search() {
    this.baseParams.sortField = null;
    this.baseParams.sortOrder = null;
    this.loadDataFromServer(this.baseParams)
  }

  reset() {
    this.searchValue = "";
    this.baseParams.sortField = null;
    this.baseParams.sortOrder = null;
    this.baseParams.filters = [];
    this.loadDataFromServer(this.baseParams)
  }

  loadDataFromServer(params: BaseParams): void {
    this.isLoading = true;
    this.baseService.getAll(params).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(response => {
      this.listData = response.data.content;
      this.total = response.data.totalElements;
    });
  }

  onQueryParamsChangeFromParent(params: NzTableQueryParams) {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);

    this.baseParams.pageIndex = pageIndex;
    this.baseParams.pageSize = pageSize;
    this.baseParams.sortField = (currentSort && currentSort.key) || null;
    this.baseParams.sortOrder = (currentSort && currentSort.value) || null;
    this.baseParams.filters = this.baseParams.filters.concat(filter);

    this.loadDataFromServer(this.baseParams);
  }
}
