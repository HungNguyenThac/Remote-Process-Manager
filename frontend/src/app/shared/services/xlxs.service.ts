import { inject, Injectable } from "@angular/core";
import { injectAppStore } from "@shared/data-access/app-store.service";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { take } from "rxjs";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";
@Injectable()
export class ExportExcelService {
  storeService = injectAppStore();

  exportAll = (fileName: string = "process-running") => {
    this.storeService
      .select((s) => s.mainData)
      .pipe(take(1))
      .subscribe((rs) => {
        this.exportAsExcelFile(rs, fileName);
      });
  };

  exportByPage = (fileName: string = "process-running") => {
    this.storeService.data$.pipe(take(1)).subscribe((rs) => {
      this.exportAsExcelFile(rs, fileName);
    });
  };

  private exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const date = `${
      new Date().getDate() +
      "/" +
      Number(new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear()
    }`;
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + "_export_" + `${date}` + EXCEL_EXTENSION);
  }
}

export const injectExportExcelService = () => inject(ExportExcelService);
