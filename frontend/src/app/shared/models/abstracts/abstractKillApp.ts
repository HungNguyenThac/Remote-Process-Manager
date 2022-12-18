import { Observable, Subscription } from "rxjs";
import { inject } from "@angular/core";
import { IProcessInfoTransformed } from "@app/ui/table/table.component";

export abstract class AbstractKillApp {
  abstract killApp(
    param: IProcessInfoTransformed | Observable<IProcessInfoTransformed>,
  ): Subscription;
}

export const injectAbstractKillApp = () => inject(AbstractKillApp);
