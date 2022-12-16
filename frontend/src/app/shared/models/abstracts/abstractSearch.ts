import { Observable, Subscription } from "rxjs";
import { inject } from "@angular/core";

export abstract class AbstractSearchData {
  abstract defaultQuery: string;
  abstract setQuery(param: string | Observable<string>): Subscription;
  abstract query$: Observable<string>;
}

export const injectAbstractSearchData = () => inject(AbstractSearchData);
