import { inject, Injectable } from "@angular/core";
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  provideComponentStore,
} from "@ngrx/component-store";
import { injectAppStore } from "@shared/data-access/app-store.service";
import { pipe, tap } from "rxjs";

@Injectable()
export class LoadingService
  extends ComponentStore<{ isLoading: boolean }>
  implements OnStoreInit, OnStateInit
{
  storeService = injectAppStore();
  isLoading$ = this.select((s) => s.isLoading, { debounce: true });

  setLoading = this.effect<boolean>(
    pipe(
      tap({
        next: (isLoading) => {
          this.patchState({
            isLoading,
          });
        },
      }),
    ),
  );

  ngrxOnStateInit(): void {
    this.setLoading(this.storeService.select((s) => s.isFetchingData));
  }

  ngrxOnStoreInit(): void {
    this.setState({ isLoading: false });
  }
}
export const provideLoadingService = () =>
  provideComponentStore(LoadingService);
export const injectLoadingService = () => inject(LoadingService);
