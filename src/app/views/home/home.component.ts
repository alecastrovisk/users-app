import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private UserService: UserService) { }

  logout() {
    this.UserService.logout();
    alert('Usuário deslogado');
  }
}
