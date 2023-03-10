import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import { first } from 'rxjs';
import { GET_USERS } from 'src/app/graphql/graphql.queries';
import { User } from 'src/app/models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private userService: UserService,
    private apollo: Apollo,
    public dialog: MatDialog
  ) { }

  users: User[] = [];

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_USERS
    }).valueChanges.subscribe(({ data }: any) => {
      this.users = data.users;
    }
    );
  }

  logout() {
    this.userService.logout();
    alert('Usuário deslogado');
  }

  deleteUser(id: number) {
    console.log('entrei no component e o id é:', id)
    this.userService.delete(id);
  }

  openDialog(id: number, name: string, email: string): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '33rem',
      height: '35rem',
      data: { id, name, email }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('close dialog', result);
    })
  }
}

@Component({
  selector: 'edit-user-dialog',
  templateUrl: './edit-user-dialog.html',
  styleUrls: ['./edit-user-dialog.scss']
})
export class EditUserDialogComponent {
  form!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get formControls() { return this.form.controls };

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const updateUserValues = {
      ...this.form.value,
      id: this.data.id
    }
    console.log(updateUserValues);
    this.userService.update(updateUserValues)
      .pipe(first())
      .subscribe({
        next: () => {
          alert('Usuário atualizado com sucesso!');
          location.reload();
        },
        error: error => {
          if (error.status === 409) return alert('O email já existe!');
          alert('Não foi possível fazer o cadastro :c');
        }
      })

  }
}
