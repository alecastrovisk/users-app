import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS } from 'src/app/graphql/graphql.queries';
import { User } from 'src/app/models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private userService: UserService, private apollo: Apollo) { }

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
}
