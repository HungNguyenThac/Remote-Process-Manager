import { inject, Injectable } from "@angular/core";
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  provideComponentStore,
} from "@ngrx/component-store";
import { pipe, tap } from "rxjs";
import {
  injectAppStore,
  KillAppNotify,
} from "@shared/data-access/app-store.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class MatSnackbarService
  extends ComponentStore<{ openSnackBar: boolean }>
  implements OnStoreInit, OnStateInit
{
  storeService = injectAppStore();
  snackbar = inject(MatSnackBar);

  objGetNotify = {
    [KillAppNotify.SUCCESS]: () =>
      this.snackbar
        .open("Đóng ứng dụng thành công", "", {
          verticalPosition: "top",
          horizontalPosition: "right",
        })
        .afterOpened()
        .subscribe(() => {
          this.storeService.patchState({
            killAppNotify: KillAppNotify.PENDING,
          });
        }),

    [KillAppNotify.FAILURE]: () =>
      this.snackbar
        .open("Đóng ứng dụng thất bại", "", {
          verticalPosition: "top",
          horizontalPosition: "right",
        })
        .afterOpened()
        .subscribe(() =>
          this.storeService.patchState({
            killAppNotify: KillAppNotify.PENDING,
          }),
        ),
    [KillAppNotify.PENDING]: () => {},
  };

  openSnackbar = this.effect<KillAppNotify>(
    pipe(
      tap((notify) => {
        return this.objGetNotify[notify]();
      }),
    ),
  );
  ngrxOnStoreInit() {
    this.setState({ openSnackBar: false });
  }

  ngrxOnStateInit() {
    this.openSnackbar(this.storeService.select((s) => s.killAppNotify));
  }
}
export const provideMatSnackbarService = () =>
  provideComponentStore(MatSnackbarService);

export const injectMatSnackbarService = () => inject(MatSnackbarService);
