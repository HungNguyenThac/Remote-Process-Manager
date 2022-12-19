import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { Observable } from "rxjs";
import { injectAppStore } from "@shared/data-access/app-store.service";
import { MatButtonModule } from "@angular/material/button";
import { injectAbstractKillApp } from "@shared/models/abstracts/abstractKillApp";
import { MatDialog } from "@angular/material/dialog";
import ConfirmDialogComponent from "@app/ui/confirm-dialog/confirm-dialog.component";
import { CalcPositionColumnTablePipe } from "@shared/pipes/calc-position-column-table.pipe";

interface IDisplayedColumns {
  dataFieldName: string;
  displayFieldName: string;
}

export interface IProcessInfoTransformed {
  pid: number;
  name: string;
  cpu: number;
  private: number;
  virtual: number;
  usage: number;
}

@Component({
  selector: "app-table",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    CalcPositionColumnTablePipe,
  ],
  templateUrl: "./table.component.html",
  styleUrls: ["table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  private readonly appStore = injectAppStore();
  private readonly killApp = injectAbstractKillApp();
  private readonly matDialog = inject(MatDialog);

  displayedColumns: IDisplayedColumns[] = [
    {
      dataFieldName: "no",
      displayFieldName: "STT",
    },
    {
      dataFieldName: "pid",
      displayFieldName: "Pid",
    },
    {
      dataFieldName: "name",
      displayFieldName: "Tên ứng dụng",
    },
    {
      dataFieldName: "cpu",
      displayFieldName: "CPU tiêu thụ",
    },
  ];
  displayedSubColumns: IDisplayedColumns[] = [
    {
      dataFieldName: "private",
      displayFieldName: "Riêng tư",
    },
    {
      dataFieldName: "virtual",
      displayFieldName: "Ảo hoá",
    },
    {
      dataFieldName: "usage",
      displayFieldName: "Sử dụng",
    },
  ];

  displayedColumnsFirstKeys: string[] = [
    "no",
    "pid",
    "name",
    "cpu",
    "mem",
    "action",
  ];
  displayedSubColumnsKeys: string[] = ["private", "virtual", "usage"];
  displayedColumnsKeys = [
    "no",
    "pid",
    "name",
    "cpu",
    "private",
    "virtual",
    "usage",
    "action",
  ];
  dataSource$: Observable<IProcessInfoTransformed[]> =
    this.appStore.dataDisplayTable$;

  ngOnInit(): void {}

  handleKillApp(element: IProcessInfoTransformed) {
    this.matDialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((rs) => {
        if (rs) {
          this.killApp.killApp(element);
        }
      });
  }
}
