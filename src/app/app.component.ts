import { Component, Input, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Subscription } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { http } from './http-header';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
 
  currentUser : User;
 checked:boolean;
 Users:string;
  // initUser(value: User) {
  //   this.currentUser = value;
  // }
  // currentUserSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,private http: HttpClient
  ) {
    // if (this.currentUser != null) {
    // this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
    //   this.currentUser = user;
    // });
    // }
    
    
    
  }
  // @HostListener('window:unload', ['$event'])
  //   unloadHandler(event) {
  //       window.sessionStorage.clear();
  //   }
 
ngDoCheck(){
   
 
    if(sessionStorage.getItem('user')){
      this.Users= sessionStorage.getItem('user');
      this.checked=true;
    }else{
      this.checked=false;
    }
     
}
  ngOnInit() {
    
 
  }
}

