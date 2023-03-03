import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { UserCredentials } from './User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  constructor(private authService: AuthService) {}

  email =  new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  login() {
    const userCredentials: UserCredentials = {
      email: this.email.value,
      password: this.password.value
    }

    this.authService.login(userCredentials).subscribe(token => {
      console.log(token);
    },
    error => alert('Email ou senha inválidos!')
    )
  }

  logout() {
    this.authService.logout();
  }
}
