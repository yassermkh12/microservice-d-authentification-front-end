import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) {}

  getUser(): Observable<User[]>{
    return this.http.get<User[]>(`http://localhost:8080/api/account/users`);
  }
}
