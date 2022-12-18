import { enableProdMode, importProvidersFrom } from "@angular/core";
import { environment } from "@environment/environment";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "@app/app.component";
import { provideRouter } from "@angular/router";
import { appRoutes } from "@app/app-routing";
import { appImports } from "@app/app.import";
import { appProvide, httpInterceptor } from "@app/app.provide";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(appImports),
    provideRouter(appRoutes),
    appProvide,
    provideHttpClient(withInterceptors([httpInterceptor])),
  ],
})
  .then()
  .catch((e) => console.error(e));
