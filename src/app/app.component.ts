import { Component, Input } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Subscription } from 'rxjs';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OnlineSystem';
  currentUser: User = null;
  initUser(value: User) {
    this.currentUser = value;
  }
  currentUserSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    // if (this.currentUser != null) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      
      this.currentUser = user;
    });
    // }
  }
}

