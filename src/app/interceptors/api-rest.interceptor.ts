import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Auth } from 'aws-amplify';
import {map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ApiRestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler): Observable<HttpEvent<unknown>> {
      return from(Auth.currentSession()).pipe(mergeMap(resp=>{
        let token = resp.getIdToken().getJwtToken();
        request = request.clone({
          setHeaders:{
            Authorization: token
          }
        });
        return next.handle(request);
      }));
  }
}

/*
export const interceptorApiRestProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiRestInterceptor, multi: true },
];*/
