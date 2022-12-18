import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchComponent } from "@app/ui/search/search.component";
import { TableComponent } from "@app/ui/table/table.component";
import { PaginatorComponent } from "@app/ui/pagination/pagination.component";
import { MatButtonModule } from "@angular/material/button";
import { injectExportExcelService } from "@shared/services/xlxs.service";

@Component({
  selector: "app-grid",
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    TableComponent,
    PaginatorComponent,
    MatButtonModule,
  ],
  templateUrl: "./app-grid.component.html",
  styleUrls: ["app-grid.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppGridComponent implements OnInit {
  exportExcelService = injectExportExcelService();

  ngOnInit(): void {}

  handleExportExcel(type = "") {
    if (type) return this.exportExcelService.exportByPage();
    return this.exportExcelService.exportAll();
  }
}
