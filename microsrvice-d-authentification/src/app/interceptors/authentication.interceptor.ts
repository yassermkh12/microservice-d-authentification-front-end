import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');
    const refrechToken = localStorage.getItem('refrechToken');

    console.log("token dans l intercepteur : ", token)
    console.log("refrechtoken dans l intercepteur : ", refrechToken)

    if(token !== null){
      let clone = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log("clone dans l intercepteur : ", clone)
      return next.handle(clone).pipe(
        catchError(error => {
          if(error.status === 403 || error.status === 401){

            let refrechToken1 = refrechToken;

            console.log("refrechToken1 : ", refrechToken1);

            let cloneRefech = request.clone({
              setHeaders:{
                Authorization: `Bearer ${refrechToken1}`
              }
            })
            console.log("clone refrech dans l intercepteur",cloneRefech)
            return next.handle(cloneRefech);
          }
        
          return throwError('oui')
        })
      )
    }
    
    console.log("request : ", request);

    return next.handle(request);
  }
}
