import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchComponent } from "@app/ui/search/search.component";
import { TableComponent } from "@app/ui/table/table.component";
import { PaginatorComponent } from "@app/ui/pagination/pagination.component";

@Component({
  selector: "app-grid",
  standalone: true,
  imports: [CommonModule, SearchComponent, TableComponent, PaginatorComponent],
  templateUrl: "./app-grid.component.html",
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppGridComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
