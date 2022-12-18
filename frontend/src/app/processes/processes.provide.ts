import { Provider } from "@angular/core";
import { AbstractSearchData } from "@shared/models/abstracts/abstractSearch";
import { AbstractGetData } from "@shared/models/abstracts/abstractGetData";
import {
  injectAppStore,
  provideAppStore,
} from "@shared/data-access/app-store.service";
import { provideLoadingService } from "@shared/services/loading.service";
import { AbstractKillApp } from "@shared/models/abstracts/abstractKillApp";
import { provideMatSnackbarService } from "@shared/services/mat-snackbar.service";
import { ExportExcelService } from "@shared/services/xlxs.service";

export const processesProvide: Provider[] = [
  {
    provide: AbstractGetData,
    useFactory: () => injectAppStore(),
  },
  {
    provide: AbstractSearchData,
    useExisting: AbstractGetData,
  },
  { provide: AbstractKillApp, useExisting: AbstractGetData },
  provideAppStore({ kindOfGetData: "processes" }),
  provideLoadingService(),
  provideMatSnackbarService(),
  ExportExcelService,
];
