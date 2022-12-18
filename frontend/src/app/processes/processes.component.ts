import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppGridComponent } from "@app/ui/app-grid/app-grid.component";
import { LetModule } from "@ngrx/component";
import { injectAbstractGetData } from "@shared/models/abstracts/abstractGetData";
import { LoadingComponent } from "@app/ui/loading/loading.component";
import { injectLoadingService } from "@shared/services/loading.service";
import { injectMatSnackbarService } from "@shared/services/mat-snackbar.service";

@Component({
  selector: "app-processes",
  standalone: true,
  imports: [CommonModule, AppGridComponent, LetModule, LoadingComponent],
  template: `<app-grid *ngrxLet="[]"></app-grid>
    <app-loading *ngIf="isLoading$ | async"></app-loading>`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessesComponent implements OnInit {
  private readonly storeService = injectAbstractGetData();
  readonly isLoading$ = injectLoadingService().isLoading$;
  private readonly snackbarService = injectMatSnackbarService();

  ngOnInit(): void {}
}
