export interface BaseResponse<T> {
  isSuccessed: boolean;
  data: T;
  message: string;
  code: string;
}
