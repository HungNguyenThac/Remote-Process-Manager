import { Provider } from "@angular/core";
import {
  injectAppStore,
  provideAppStore,
} from "@shared/data-access/app-store.service";
import { AbstractGetData } from "@shared/models/abstracts/abstractGetData";
import { AbstractSearchData } from "@shared/models/abstracts/abstractSearch";
import { AbstractKillApp } from "@shared/models/abstracts/abstractKillApp";
import { provideMatSnackbarService } from "@shared/services/mat-snackbar.service";
import { provideLoadingService } from "@shared/services/loading.service";
import { ExportExcelService } from "@shared/services/xlxs.service";

export const applicationsProvide: Provider[] = [
  {
    provide: AbstractGetData,
    useFactory: () => injectAppStore(),
  },
  {
    provide: AbstractSearchData,
    useExisting: AbstractGetData,
  },
  { provide: AbstractKillApp, useExisting: AbstractGetData },
  provideAppStore({ kindOfGetData: "applications" }),
  provideMatSnackbarService(),
  provideLoadingService(),
  ExportExcelService,
];
