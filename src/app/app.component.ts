import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { MyserviceService } from './myservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  message;
  currentUser: User;
  checked: boolean;
  Users: string;
  changeDetected = true;

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private myservice: MyserviceService,
    private router: Router,
    ) {
    this.router.events.subscribe((event) => {
      this.changeDetected = false;
    });
  }


  ngDoCheck() {


    if (!this.changeDetected) {

      if (this.message == 1) {
        this.message = true;
      } else {
        this.message = false
      }
      this.changeDetected = true;

    }

    this.changeDetected = false;

  }

  ngOnInit() {
    this.myservice.currentMessage.subscribe(message => this.message = message);

  }
  get isHomePage():boolean{
    return this.router.url === '/';
  }
}

