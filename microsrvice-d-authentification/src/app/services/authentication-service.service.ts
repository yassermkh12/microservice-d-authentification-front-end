import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/register-request';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../models/authentication-request';
import { AuthenticationResponse } from '../models/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http : HttpClient) { }

  register(registerRequest : RegisterRequest): Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`http://localhost:8080/api/auth/register`,registerRequest);
  }

  authenticate(authenticationRequest : AuthenticationRequest): Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`http://localhost:8080/api/auth/authenticate`,authenticationRequest);
  }
}
