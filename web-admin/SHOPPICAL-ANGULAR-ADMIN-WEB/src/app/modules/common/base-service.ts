import { Observable } from "rxjs";
import { BaseParams } from "./base-params";
import { BaseResponse } from "./base-response";

export declare interface BaseService<T> {
  getAll(baseParams: BaseParams);
  create(data: T): Observable<BaseResponse<T>>;
  delete(id: number, baseParams: BaseParams);
}
