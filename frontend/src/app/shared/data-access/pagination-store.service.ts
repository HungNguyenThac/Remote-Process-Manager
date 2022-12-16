import { inject, Injectable } from "@angular/core";
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  provideComponentStore,
} from "@ngrx/component-store";
import { PageEvent } from "@angular/material/paginator";
import { debounceTime, map, pipe, tap } from "rxjs";

export interface IPaginator {
  currentPage: number;
  total: number;
  pageSize: number;
}

export type PageEventOmitLength = Omit<PageEvent, "length">;

@Injectable()
export class PaginationStoreService
  extends ComponentStore<IPaginator>
  implements OnStoreInit, OnStateInit
{
  readonly defaultPageSize = 15;

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
      debounceTime(150),
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

export const providePagination = () =>
  provideComponentStore(PaginationStoreService);
export const injectPagination = () => inject(PaginationStoreService);
