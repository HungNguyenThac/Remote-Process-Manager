import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isAuth: boolean = false;
  readonly router = inject(Router);
  constructor() {}

  checkAuth = () => {
    if (this.isAuth) return;
    this.router.navigate(["procman/login"]).then();
  };
}
