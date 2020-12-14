import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/services/auth/session.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userSession;
  userGroupAdmin: boolean;
  submitting: boolean;
  userSubscription: Subscription;
  name: string;

  constructor(
    private session: SessionService
    ) { }

  ngOnInit(): void {
    this.userSession = this.session.getSessionValue();
    this.userGroupAdmin = this.userSession.user.groupAdmin === 1;
  }

}
