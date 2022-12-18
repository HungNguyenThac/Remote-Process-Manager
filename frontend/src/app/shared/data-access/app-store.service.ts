import { inject, Injectable } from "@angular/core";
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  provideComponentStore,
} from "@ngrx/component-store";
import { AbstractGetData } from "@shared/models/abstracts/abstractGetData";
import {
  catchError,
  defer,
  EMPTY,
  Observable,
  of,
  pipe,
  repeat,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs";
import { AbstractSearchData } from "@shared/models/abstracts/abstractSearch";
import {
  injectPagination,
  providePagination,
} from "@shared/data-access/pagination-store.service";
import {
  injectDefaultQuery,
  injectKindOfGetData,
  provideDefaultQuery,
  provideKindOfGetData,
} from "@shared/tokens/tokens";
import { injectProcessService } from "@shared/services/processes.service";
import { IProcessInfoTransformed } from "@app/ui/table/table.component";

export interface IProcessInfo {
  pid: number;
  name: string;
  cpu: number;
  mem: {
    private: number;
    virtual: number;
    usage: number;
  };
}

export enum KillAppNotify {
  PENDING = "pending",
  SUCCESS = "success",
  FAILURE = "failed",
}

interface AppState {
  dataQuery: IProcessInfo[];
  mainData: IProcessInfo[];
  query: string;
  isFetchingData: boolean;
  killAppNotify: KillAppNotify;
}

interface ConfigProvideAppStore {
  defaultQuery?: string;
  kindOfGetData?: string;
}

@Injectable()
export class AppStoreService
  extends ComponentStore<AppState>
  implements OnStoreInit, OnStateInit, AbstractGetData, AbstractSearchData
{
  readonly defaultQuery = injectDefaultQuery();
  readonly processService = injectProcessService();
  readonly paginationStore = injectPagination();
  readonly kindOfGetData = injectKindOfGetData();

  data$ = this.select(
    (s) => (s.dataQuery.length == 0 ? s.mainData : s.dataQuery),
    {
      debounce: true,
    },
  );

  dataDisplayTable$: Observable<IProcessInfoTransformed[]> = this.select(
    (s) => {
      const processes = s.dataQuery.length === 0 ? s.mainData : s.dataQuery;
      return processes.map((process) => {
        let newProcess: any = process;
        const mem = newProcess.mem;
        delete newProcess.mem;
        for (const key of Object.keys(mem || {})) {
          newProcess[key] = mem[key];
        }
        return newProcess;
      });
    },
  );

  query$ = this.select((s) => s.query);

  getData = this.effect<{ query: string }>(
    pipe(
      switchMap(({ query }) =>
        defer(() => {
          if (query) {
            this.setQuery(query);
            return of([]);
          }
          // this.patchState({ isFetchingData: true });
          return this.kindOfGetData === "applications"
            ? this.processService.getApplications()
            : this.processService.getAllProcess();
        }).pipe(repeat({ delay: 1500 })),
      ),
      tap((response) => {
        if (response.length === 0) return;
        this.paginationStore.setTotal(response.length);
        this.patchState({
          isFetchingData: false,
          mainData: response,
        });
        this.setData(
          this.select(
            {
              data: this.select((s) => s.mainData),
              pageSize: this.paginationStore.select((s) => s.pageSize),
              page: this.paginationStore.select((s) => s.currentPage),
            },
            { debounce: true },
          ),
        );
      }),
      catchError(() => EMPTY),
    ),
  );

  killApp = this.effect<IProcessInfoTransformed>(
    pipe(
      switchMap(({ pid }) => {
        return this.processService.postKillApp(pid);
      }),
      tap((response) => {
        if (response)
          return this.patchState({ killAppNotify: KillAppNotify.SUCCESS });
        return this.patchState({ killAppNotify: KillAppNotify.FAILURE });
      }),
    ),
  );

  // setQuery
  setQuery = this.effect<string>(
    pipe(
      withLatestFrom(this.select((s) => s.mainData)),
      switchMap(([query, data]) => {
        this.patchState({
          query,
        });
        const dataMatchQuery = data.filter((process) => {
          return (
            process.name.toLowerCase().startsWith(query.toLowerCase()) ||
            process.pid.toString().startsWith(query.toLowerCase())
          );
        });
        return of({
          data: dataMatchQuery,
          length: dataMatchQuery.length,
        });
      }),
      tap({
        next: (response) => {
          this.paginationStore.setPage(
            this.select({
              pageIndex: of(0),
              pageSize: this.paginationStore.select((s) => s.pageSize),
            }),
          );
          this.paginationStore.setTotal(response.length);

          //patch state here
          this.setData(
            this.select(
              {
                data: of(response.data),
                pageSize: this.paginationStore.select((s) => s.pageSize),
                page: this.paginationStore.select((s) => s.currentPage),
              },
              { debounce: true },
            ),
          );
        },
      }),
      catchError(() => EMPTY),
    ),
  );

  setData = this.effect<{
    data: IProcessInfo[];
    pageSize: number;
    page: number;
  }>(
    pipe(
      switchMap(({ data, pageSize, page }) => {
        const pageIndex = page - 1;
        const itemIndex = pageIndex * pageSize;
        const response = data.slice(itemIndex, page * pageSize);
        return of(response);
      }),
      tap({
        next: (response) => {
          this.patchState({
            dataQuery: response,
          });
        },
      }),
    ),
  );

  ngrxOnStoreInit() {
    this.setState({
      dataQuery: [],
      query: this.defaultQuery,
      mainData: [],
      isFetchingData: false,
      killAppNotify: KillAppNotify.PENDING,
    });
  }

  ngrxOnStateInit() {
    this.getData(
      this.select(
        {
          query: this.select((s) => s.query),
        },
        { debounce: true },
      ),
    );
  }
}

export const provideAppStore = (config?: ConfigProvideAppStore) => {
  return [
    provideComponentStore(AppStoreService),
    providePagination(),
    provideDefaultQuery(config?.defaultQuery ?? ""),
    provideKindOfGetData(config?.kindOfGetData ?? "applications"),
  ];
};

export const injectAppStore = () => inject(AppStoreService);
