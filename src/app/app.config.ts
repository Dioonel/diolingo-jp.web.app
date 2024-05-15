import { ApplicationConfig } from "@angular/core";
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { MyInterceptor } from './interceptors/interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations()
  ]
}
