import { enableProdMode, importProvidersFrom } from "@angular/core";
import { environment } from "@environment/environment";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "@app/app.component";
import { provideRouter } from "@angular/router";
import { appRoutes } from "@app/app-routing";
import { appImports } from "@app/app.import";
import { appProvide } from "@app/app.provide";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(appImports, BrowserAnimationsModule),
    provideRouter(appRoutes),
    appProvide,
  ],
})
  .then()
  .catch((e) => console.error(e));
