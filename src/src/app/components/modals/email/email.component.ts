import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserEmail } from 'src/app/models/caebo.constants';
import { EmailService } from 'src/app/services/email/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  @Input() userID: number;
  loading: boolean;
  error: string;
  showFormBool: boolean = true;
  userEmails: UserEmail[];
  emailSubscription: Subscription;

  constructor(
    private emailService: EmailService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.emailSubscription = this.emailService.getUserEmails(this.userID).subscribe(
      (data) => {
        if (data.statusCode !== 0) {
          this.error = 'Something went wrong. Please reload the page.'
        } else {
          this.userEmails = data.message.filter(e => !e.is_primary);
        }
      },
      (error) => {
        this.error = 'Something went wrong. Please reload the page.';
        this.loading = false;
      },
      () => { this.loading = false; }
    );
  }

  showFormOption(option: number) {
    this.showFormBool = option === 0;
  }

}
