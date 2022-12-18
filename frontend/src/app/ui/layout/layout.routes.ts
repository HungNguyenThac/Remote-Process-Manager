import { Routes } from "@angular/router";
import { applicationsProvide } from "@app/applications/applications.provide";
import { processesProvide } from "@app/processes/processes.provide";

export const layoutRoutes: Routes = [
  {
    path: "",
    redirectTo: "applications",
    pathMatch: "full",
  },
  {
    path: "applications",
    loadComponent: () =>
      import("../../applications/applications.component").then(
        (c) => c.ApplicationsComponent,
      ),
    providers: [applicationsProvide],
  },
  {
    path: "processes",
    loadComponent: () =>
      import("../../processes/processes.component").then(
        (c) => c.ProcessesComponent,
      ),
    providers: [processesProvide],
  },
];
