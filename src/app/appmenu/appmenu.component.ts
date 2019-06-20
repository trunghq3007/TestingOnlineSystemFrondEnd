import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../user';


@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.scss']
})
export class AppmenuComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  isMember = false;
  isManager = false;
  isAdmin = false;
UserName:string;
    constructor(
      private router: Router,
      private authenticationService: AuthenticationService
    ) 
    {
        // this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        //     this.currentUser = JSON.parse(user);
        // });
        // if(this.currentUser.RoleId == '1')
        // {
        //   this.isAdmin = true;
        // }
        // if(this.currentUser.RoleId == '2')
        // {
        //   this.isManager = true;
        // }
        // if(this.currentUser.RoleId == '3')
        // {
        //   this.isMember = true;
        // }
    }

  ngOnInit() {
    if(sessionStorage.getItem('user')){
      this.UserName = sessionStorage.getItem('user');
     
    }else{
      this.UserName=null;
    }
     console.log(this.currentUser);
  }

}
