import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor {

  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.userService.userValue;
    // console.log('user chegando no intercpetor', user.access_token)
    // if (request.url.indexOf('/graphql') > -1) {
    //   console.log('Entrei no if graphql');
    //   if (user) {
    //     request = request.clone({
    //       setHeaders: {
    //         Authorizations: `Bearer ${user.access_token}`
    //       }
    //     });
    //     return next.handle(request);
    //   }
    // }
    if (user) {
      console.log('Entrei no if http');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.access_token}`
        }
      });
    }
    return next.handle(request);
  }
}
