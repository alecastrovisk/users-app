import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserCredentials } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private userService: UserService) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  login() {
    const userCredentials: UserCredentials = {
      email: this.email.value,
      password: this.password.value
    }

    this.userService.login(userCredentials).subscribe(token => {
      console.log(token);
    },
      error => {
        if (error.statusText === 'Unknown Error') {
          alert('erro no servidor, tente novamente mais tarde');
        } if (error.statusText === 'Unauthorized') {
          alert('Email ou senha inválidos!');
        } else {
          console.log(error.message);
        }
      }
    )
  }

  logout() {
    this.userService.logout();
  }
}
