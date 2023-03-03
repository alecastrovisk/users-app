import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserCredentials } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  constructor(private userService: UserService) {}

  email =  new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  login() {
    const userCredentials: UserCredentials = {
      email: this.email.value,
      password: this.password.value
    }

    this.userService.login(userCredentials).subscribe(token => {
      console.log(token);
    },
    error => alert('Email ou senha inválidos!')
    )
  }

  logout() {
    this.userService.logout();
  }
}
