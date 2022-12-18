import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IProcessInfo } from "@shared/data-access/app-store.service";

@Injectable({
  providedIn: "root",
})
export class ProcessesService {
  readonly baseApi = "http://localhost:9527/procman";
  readonly httpClient = inject(HttpClient);

  getAllProcess = () =>
    this.httpClient.get<IProcessInfo[]>(`${this.baseApi}/processes`);

  getApplications = () =>
    this.httpClient.get<IProcessInfo[]>(`${this.baseApi}/applications`);

  postKillApp = (pid: number) =>
    this.httpClient.post(`${this.baseApi}/killapp`, { pid });
}

export const injectProcessService = () => inject(ProcessesService);
