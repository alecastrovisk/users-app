import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  login({ email, password }: User): Observable<Response> {
    return this.httpClient.post<Response>('http://localhost:3000/login', { email, password })
    .pipe(map(user => {
      localStorage.setItem('userToken', JSON.stringify(user));
      return user;
    }));
  }
}
