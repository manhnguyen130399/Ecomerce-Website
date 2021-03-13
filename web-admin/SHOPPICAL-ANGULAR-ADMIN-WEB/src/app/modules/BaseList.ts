export class BaseList {
  isShowModal = false;
  isLoading = false;
  pageSize = 5;
  pageIndex = 1;
  total = 1;
  searchValue = '';
  visible = false;

  showModal() {
    this.isShowModal = true;
  }

  closeModal() {
    this.isShowModal = false;
  }
  constructor() {}
}
