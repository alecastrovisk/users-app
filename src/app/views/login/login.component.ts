import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email =  new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  hide = true;

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
}
