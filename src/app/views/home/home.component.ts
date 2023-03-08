import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  constructor(private UserService: UserService, private apollo: Apollo) { }

  users: User[] = [];
  dataSource = this.users;
  clickedRows = new Set<User>();
  headerColumns: string[] = ['id', 'name', 'email'];

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_USERS
    }).valueChanges.subscribe(({ data }: any) => {
      this.users = data.users;
    }
    );
  }

  logout() {
    this.UserService.logout();
    alert('Usuário deslogado');
  }
}
