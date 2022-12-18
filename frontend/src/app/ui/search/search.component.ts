import { NgIf } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { injectAbstractSearchData } from "@shared/models/abstracts/abstractSearch";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-search",
  standalone: true,
  templateUrl: "search.component.html",
  styles: [``],
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
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
