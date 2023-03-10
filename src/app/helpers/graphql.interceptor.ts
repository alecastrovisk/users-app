import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class GraphqlInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Filter your endpoint in order to only edit the graphql-related requests
    if (request.url.indexOf('/graphql') > -1) {
      const user = this.userService.userValue;
      console.log('Estou sendo chamado')
      if (user) {
        request = request.clone({
          setHeaders: {
            Authorizations: `Bearer ${user.userToken}`
          }
        });
        return next.handle(request);
      }
    }
    // If it's not a graphql request, just give it to the next handler.
    return next.handle(request);
  }
}