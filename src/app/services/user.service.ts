import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RegisterUser, User, UserCredentials } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private router: Router,
    private httpClient: HttpClient,

  ) { }

  public get userValue() {
    const user = JSON.parse(localStorage.getItem('userToken')!);
    console.log(user);
    return user;
  }

  login({ email, password }: UserCredentials): Observable<Response> {
    return this.httpClient.post<Response>('http://localhost:3000/login', { email, password })
      .pipe(map(user => {
        localStorage.setItem('userToken', JSON.stringify(user));

        this.router.navigate(['home']);

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['login']);
  }

  register({ name, email, password }: RegisterUser) {
    console.log('register function called');
    return this.httpClient.post<Response>('http://localhost:3000/user', { name, email, password });
  }

  getAllUsers() { }
}
