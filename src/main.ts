import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DialogModule } from '@angular/cdk/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { MyInterceptor } from './app/interceptors/interceptor.interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, FontAwesomeModule, DialogModule, CdkAccordionModule, MatProgressSpinnerModule, MatTooltipModule),
        {
            provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
