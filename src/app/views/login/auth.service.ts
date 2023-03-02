import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RegisterUser, UserCredentials } from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  login({ email, password }: UserCredentials): Observable<Response> {
    return this.httpClient.post<Response>('http://localhost:3000/login', { email, password })
    .pipe(map(user => {
      localStorage.setItem('userToken', JSON.stringify(user));

      this.router.navigate(['home']);

      return user;
    }));
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  register(data: RegisterUser) {
    return this.httpClient.post<Response>('http://localhost:3000/user', { data });
  }
}
