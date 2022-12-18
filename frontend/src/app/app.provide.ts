import { APP_INITIALIZER, Provider } from "@angular/core";
import { HttpInterceptorFn } from "@angular/common/http";
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBar,
  MatSnackBarConfig,
} from "@angular/material/snack-bar";

export const appProvide: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: () => console.log("Bootstrap success"),
  },
  { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },

  MatSnackBar,
  MatSnackBarConfig,
];

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  return next(
    req.clone({
      setHeaders: {
        "Content-type": "application/json; charset=utf-8",
      },
    }),
  );
};
