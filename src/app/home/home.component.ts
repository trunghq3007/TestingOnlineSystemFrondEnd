import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../user';

import { Isemaster } from '../isemaster';
import { ToastrService } from 'ngx-toastr';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';
import * as moment from 'moment'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  gotoLogin: boolean;
  image = [
    '../../assets/image/slider1.png',
    '../../assets/image/slider2.png',
    '../../assets/image/slider3.png'
  ];
  currentSlide = 0;
  tests;
  semesterExamCode = '';
  Users: string;
  LisUser;
  UserId: string;
  // RoleId:string;
  // UserName: string;
  semester: Isemaster;
  semesters: Isemaster[] = [];
  date: string;
  hide: boolean;
  isMember: boolean = true;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private http: HttpClient, private router: Router,
    private authenticationService: AuthenticationService,
    private toasr: ToastrService,
    private myservice: MyserviceService) {
    this.changeSlide();


    this.gotoLogin = this.authenticationService.gotoLogin;
/*    this.router.events.subscribe((event) => {
      // this.myservice.changeMessage('2');
    });*/
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(this.router.url == '/'){
          this.gotoLogin = this.authenticationService.gotoLogin;
        }
      }
    });
    this.http.get<string>('http://localhost:65170/api/SemesterCustomer', { headers: http() }).subscribe(
      value => {
        this.semesters = JSON.parse(value).Data;
      });
    this.date = moment(new Date()).format('YYYY');

    let user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
      this.UserId = this.currentUser.UserId;
      this.isMember = this.currentUser.RoleId == '7' || false;
    }
  }

  public hasMember(): boolean {
    let user = localStorage.getItem('currentUser');
    if (user) {
      var currentUser = JSON.parse(user);
      var isMember = currentUser.RoleId == '7' || false;
      return isMember;
    }
    return true;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck() {
    // if (sessionStorage.getItem('user')) {
    //   this.Users = sessionStorage.getItem('user');
    //   // this.LisUser = this.Users.split(',');
    //   // this.UserName = this.LisUser[2];
    //   // this.UserId = this.LisUser[0];
    // } else {
    //   this.Users = null;
    //
    // }

  }


  changeSlide() {
    this.currentSlide++;
    if (this.currentSlide > 3) {
      this.currentSlide = 1;
    }

    // console.log(this.currentSlide);

    setTimeout(() => {
      this.changeSlide();
    }, 3000);

    // this.sharedService.isAuthentication.subscribe(
    //   isAuthentication => (this.isAuthentication = isAuthentication)
    // );

    localStorage.getItem('isAuthen');
    // if (isAuthen === 'true') {
    //   this.route.navigate(['/exam']);
    // }
  }

  showSemesterTest() {
    if (this.semesterExamCode) {
      this.toasr.warning('You Must Input Code');
    } else if (this.semesterExamCode !== '') {
      this.http.get<string>('http://localhost:65170/api/SemesterCustomer?code=' + this.semesterExamCode, { headers: http() })
        .subscribe(value => {
          this.semesters = JSON.parse(value).Data;
          console.log(value);
        }
        );
    } else {
      this.toasr.error('');
    }
  }

  Logout() {
    // localStorage.removeItem('currentUser');
    // this.currentUser = null;
    // sessionStorage.removeItem('currentPermission');
    // this.router.navigate(['']);
    // location.reload();
    //
    // sessionStorage.removeItem('user');
    this.authenticationService.logout();
  }

  change(e) {
    this.semesterExamCode = e.value;
    console.log(this.semesterExamCode);
  }



  login() {
    this.authenticationService.gotoLogin = true;
    this.router.navigate(['login']);
  }


}
