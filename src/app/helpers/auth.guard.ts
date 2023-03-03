import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    
    const user = this.userService.userValue;
    console.log('aqui o que veio de user:', user);
    if(user) {
      console.log('passei no guard');
      return true;
    } else {
      console.log(' não passei no guard');
      this.router.navigate(['/login']);
      return false;
    }  
  }
  
}
