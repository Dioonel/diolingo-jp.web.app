import { ApplicationConfig } from "@angular/core";
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { MyInterceptor } from '@interceptors/interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations()
  ]
}
