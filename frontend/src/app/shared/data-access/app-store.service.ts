import { inject, Injectable } from "@angular/core";
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  provideComponentStore,
} from "@ngrx/component-store";
import { AbstractGetData } from "@shared/models/abstracts/abstractGetData";
import { pipe } from "rxjs";
import { AbstractSearchData } from "@shared/models/abstracts/abstractSearch";

export interface IProcessInfo {
  pid: string;
  name: string;
  cpu: string;
  mem: {
    private: string;
    virtual: string;
    usage: string;
  };
}

export interface AppState {
  data: IProcessInfo[];
  query: string;
}

export interface ConfigProvideAppStore {}

@Injectable()
export class AppStoreService
  extends ComponentStore<AppState>
  implements OnStoreInit, OnStateInit, AbstractGetData, AbstractSearchData
{
  readonly defaultQuery = "Google Chrome";

  data$ = this.select((s) => s.data, { debounce: true });
  query$ = this.select((s) => s.query);

  getData = this.effect<{ query: string; page: number; pageSize: number }>(
    pipe(),
  );

  setQuery = this.effect<string>(pipe());

  ngrxOnStoreInit() {
    this.setState({
      data: [],
      query: this.defaultQuery,
    });
  }
  ngrxOnStateInit() {}
}
export const provideAppStore = (config: ConfigProvideAppStore) => {
  return [provideComponentStore(AppStoreService)];
};

export const injectAppStore = () => inject(AppStoreService);
