export interface BaseResponse<T> {
  isSuccessed: boolean;
  data: T;
  Message: string;
  Code: string;
}
