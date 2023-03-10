import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RegisterUser, UpdateUser, UserCredentials } from '../models/User';

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
    console.log('userValue:', user)
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

  delete(id: number) {
    if (id === this.userValue.user.id) {
      this.logout();
    }
    return this.httpClient.delete(`http://localhost:3000/user/${id}`).subscribe(data => {
      this.router.navigate(['home'], { skipLocationChange: false });
      location.reload();
      alert('Usuário deletado com sucesso!');
    });
  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['login']);
  }

  register({ name, email, password }: RegisterUser) {
    return this.httpClient.post<Response>('http://localhost:3000/user', { name, email, password });
  }

  update({ id, name, email, password }: UpdateUser) {
    return this.httpClient.put<Response>(`http://localhost:3000/user/${id}`, { name, email, password })
  }
}
