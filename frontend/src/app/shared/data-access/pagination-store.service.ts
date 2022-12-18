import { inject, Injectable } from "@angular/core";
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  provideComponentStore,
} from "@ngrx/component-store";
import { map, pipe, tap } from "rxjs";
import {
  injectDefaultPageSize,
  provideDefaultPageSize,
} from "@shared/tokens/tokens";
import { PageEvent } from "@angular/material/paginator";

export interface IPaginator {
  currentPage: number;
  total: number;
  pageSize: number;
}

export type PageEventOmitLength = Omit<PageEvent, "length">;

export interface ConfigPagination {
  pageSize: number;
}

@Injectable()
export class PaginationStoreService
  extends ComponentStore<IPaginator>
  implements OnStoreInit, OnStateInit
{
  readonly defaultPageSize = injectDefaultPageSize();

  readonly paginator$ = this.select(
    {
      pageIndex: this.select((s) => s.currentPage).pipe(
        map((page) => page - 1),
      ),
      pageSize: this.select((s) => s.pageSize),
      total: this.select((s) => s.total ?? 100),
    },
    { debounce: true },
  );

  readonly setTotal = this.updater<number>((state, total) => ({
    ...state,
    total,
  }));

  readonly setPage = this.effect<PageEventOmitLength>(
    pipe(
      tap((event) => {
        this.patchState({
          pageSize: event.pageSize,
          currentPage: event.pageIndex + 1,
        });
      }),
    ),
  );

  ngrxOnStoreInit() {
    this.setState({
      currentPage: 1,
      pageSize: this.defaultPageSize,
      total: 0,
    });
  }

  ngrxOnStateInit(): void {}
}

export const providePagination = (config?: ConfigPagination) => [
  provideComponentStore(PaginationStoreService),
  provideDefaultPageSize(config?.pageSize ?? 15),
];
export const injectPagination = () => inject(PaginationStoreService);
