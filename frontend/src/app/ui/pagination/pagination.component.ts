import { AsyncPipe, NgIf } from "@angular/common";
import { Component } from "@angular/core";

import { LetModule } from "@ngrx/component";
import { injectPagination } from "@shared/data-access/pagination-store.service";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-paginator",
  standalone: true,
  template: `
    <ng-container *ngrxLet="paginationStore.paginator$ as paginator">
      <mat-paginator
        [length]="paginator.total"
        [pageSize]="paginator.pageSize"
        [showFirstLastButtons]="true"
        [pageIndex]="paginator.pageIndex"
        (page)="handlePageChange($event)"
        aria-label="Select page"
        [hidePageSize]="false"
        [pageSizeOptions]="pageSizeOption"
      ></mat-paginator>
    </ng-container>
  `,
  imports: [MatPaginatorModule, LetModule, AsyncPipe, NgIf],
})
export class PaginatorComponent {
  readonly paginationStore = injectPagination();
  readonly pageSizeOption: number[] = [5, 10, 15, 20, 25];

  constructor() {}

  handlePageChange($event: PageEvent) {
    this.paginationStore.setPage($event);
  }
}
