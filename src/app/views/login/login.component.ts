import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  constructor(private authService: AuthService) {

  }

  email =  new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getErrorMessage() {
   if(this.email.hasError('required')) {
    return 'Você deve preencher um valor';
   } 

   return this.email.hasError('email') ? 'O email não é válido' : '';
  }

  submit() {
    console.log(this.email.value);
    console.log(this.password.value)
  }

  login() {
    const userCredentials: User = {
      email: this.email.value,
      password: this.password.value
    }

    this.authService.login(userCredentials).subscribe(token => {
      console.log(token);
    },
    error => console.log(error)
    )
  }
}
