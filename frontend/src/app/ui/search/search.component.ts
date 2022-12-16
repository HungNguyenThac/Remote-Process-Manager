import { NgIf } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { injectAbstractSearchData } from "@shared/models/abstracts/abstractSearch";

@Component({
  selector: "app-search",
  standalone: true,
  template: `
    <mat-form-field>
      <input
        matInput
        type="text"
        placeholder="Search..."
        [formControl]="queryControl"
      />
      <button
        *ngIf="queryControl.value"
        matSuffix
        mat-icon-button
        aria-label="Clear"
        (click)="queryControl.reset()"
      >
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
  `,
  styles: [``],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    ReactiveFormsModule,
  ],
})
export class SearchComponent implements OnInit {
  readonly queryControl = inject(NonNullableFormBuilder).control("");
  private readonly storeService = injectAbstractSearchData();

  ngOnInit() {
    this.storeService.query$.subscribe((query) => {
      this.queryControl.setValue(query, { emitEvent: false });
    });
    this.storeService.setQuery(
      this.queryControl.valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(250),
      ),
    );
  }
}
