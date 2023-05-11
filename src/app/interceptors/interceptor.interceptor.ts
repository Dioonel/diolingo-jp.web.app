import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.headers.has('skip')){
      req = req.clone({
        headers: req.headers.delete('skip')
      });
      return next.handle(req);
    }

    let token = localStorage.getItem('jwt');
    if(token !== null && token !== '' && token !== 'null'){
      let reqAuth = req.clone({
        setHeaders:{
          'Authorization': `Bearer ${token}`
        }
      });
      return next.handle(reqAuth);
    }
    return next.handle(req);
  }
}
