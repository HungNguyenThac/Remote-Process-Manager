import { Routes } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "@shared/services/auth.service";

export const appRoutes: Routes = [
  {
    path: "procman",
    loadComponent: () =>
      import("./ui/layout/layout.component").then((c) => c.LayoutComponent),
    loadChildren: () =>
      import("./ui/layout/layout.routes").then((r) => r.layoutRoutes),
    canActivate: [() => inject(AuthService).checkAuth()],
  },
  {
    path: "procman/login",
    pathMatch: "full",
    loadComponent: () =>
      import("./login/login.component").then((c) => c.LoginComponent),
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "procman",
  },
];
