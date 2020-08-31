import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';
import { User } from './models/caebo.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'src';
  users: User[];

  constructor(
    private userService: UserService
  ) {}

    ngOnInit() {
      this.userService.getUsers().subscribe(data => {
        this.users = data;
      })
    }
}
