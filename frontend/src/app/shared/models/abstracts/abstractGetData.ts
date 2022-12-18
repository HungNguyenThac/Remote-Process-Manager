import { Observable, Subscription } from "rxjs";
import { inject } from "@angular/core";

export interface ParamGetData {
  page?: number;
  pageSize?: number;
  query?: string;
}

export abstract class AbstractGetData {
  abstract getData(
    param: ParamGetData | Observable<ParamGetData>,
  ): Subscription;
  abstract data$: Observable<any>;
}

export const injectAbstractGetData = () => inject(AbstractGetData);
