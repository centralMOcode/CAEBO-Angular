import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/auth/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userSession;
  userGroup: string;
  userGroupAdmin: boolean;
  showForm: boolean;
  alertMessage: string = 'Profile Information Updated Successfully!';

  constructor(
    private session: SessionService
  ) { }

  ngOnInit(): void {
    this.userSession = this.session.getSessionValue();
    this.userGroupAdmin = this.userSession.user.groupAdmin === 1;
    this.userGroup = this.userSession.user.groupName;
  }

  onChangeClicked() {
    this.showForm = true;
  }

}
