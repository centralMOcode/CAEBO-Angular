import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiResponse, User } from 'src/app/models/caebo.constants';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  users: User[];
  userSubscription: Subscription;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.userSubscription = this.service.getUsers().subscribe(
      (data) => {
        this.users = data.message;
      },
      (error) => {
        console.log(error);
      },
      () => {  }
    );
  }

  log(name: string) {
    console.log(name);
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
