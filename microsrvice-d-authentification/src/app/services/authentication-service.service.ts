import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/register-request';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../models/authentication-request';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http : HttpClient) { }

  register(registerRequest : RegisterRequest): Observable<RegisterRequest>{
    return this.http.post<RegisterRequest>(`http://localhost:8080/api/auth/register`,registerRequest);
  }

  authenticate(authenticationRequest : AuthenticationRequest): Observable<AuthenticationRequest>{
    return this.http.post<AuthenticationRequest>(`http://localhost:8080/api/auth/authenticate`,authenticationRequest);
  }
}
