import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token')

    console.log("token dans l intercepteur : ", token)

    if(token !== null){
      let clone = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log("clone dans l intercepteur : ", clone)
      return next.handle(clone)
    }
    
    console.log("request : ", request);

    return next.handle(request);
  }
}
