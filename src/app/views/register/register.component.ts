import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() { return this.form.controls };

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.userService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          alert('Usuário criado com sucesso!');
          this.router.navigate(['../home']);
        },
        error: error => {
          if (error.status === 409) return alert('O email já existe!');
          alert('Não foi possível fazer o cadastro :c');
        }
      })

  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }
}
