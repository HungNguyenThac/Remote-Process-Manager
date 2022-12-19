import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppGridComponent } from "@app/ui/app-grid/app-grid.component";
import { LetModule } from "@ngrx/component";
import { LoadingComponent } from "@app/ui/loading/loading.component";
import { injectLoadingService } from "@shared/services/loading.service";

@Component({
  selector: "app-applications",
  standalone: true,
  imports: [CommonModule, AppGridComponent, LetModule, LoadingComponent],
  template: `<app-grid *ngrxLet="[]"></app-grid>
    <app-loading *ngIf="isLoading$ | async"></app-loading>`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit {
  readonly isLoading$ = injectLoadingService().isLoading$;
  ngOnInit(): void {}
}
