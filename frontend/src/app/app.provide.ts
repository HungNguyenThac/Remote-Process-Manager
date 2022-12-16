import { APP_INITIALIZER, Provider } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";

export const appProvide: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: () => console.log("Bootstrap success"),
  },
  {
    provide: APP_BASE_HREF,
    useValue: "/",
  },
];
