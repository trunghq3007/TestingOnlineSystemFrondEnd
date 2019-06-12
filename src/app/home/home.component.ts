import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../user';
export class semaster{
  ID:number;
  SemesterName:string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  gotoLogin: boolean;
  semasters:semaster[]=[];
  image = [
    '../../assets/image/slider1.png',
    '../../assets/image/slider2.png',
    '../../assets/image/slider3.png'
  ];
  currentSlide = 0;
  tests;
  semesterExamCode = '';
  isAuthentication = false;
  SemasterExamCode: string;
  constructor(private http: HttpClient, private router: Router, private authenticationService: AuthenticationService) {
    this.changeSlide();
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.gotoLogin = this.authenticationService.gotoLogin;
  }

  ngOnInit() {

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

    const isAuthen = localStorage.getItem('isAuthen');
    // if (isAuthen === 'true') {
    //   this.route.navigate(['/exam']);
    // }
  }

  showSemesterTest() {
    if (this.semesterExamCode !== '') {
      this.http
        .get(`http://localhost:8080/semester-code/${this.semesterExamCode}`)
        .subscribe(ob => {
          console.log(ob);
          this.tests = ob;
        });
    }
  }

  change(e) {
    this.semesterExamCode = e.value;
    console.log(this.semesterExamCode);
  }

  signIn() {
    // this.sharedService.authentic(true);
    // localStorage.setItem('isAuthen', 'true');
    // this.route.navigate(['/exam']);
  }
  login() {
    this.authenticationService.gotoLogin = true;
    this.router.navigate(['login']);
  }
  onSearch() {
    this.http.get<string>('http://localhost:65170/api/SemasterExam?searchString=' + this.SemasterExamCode).subscribe(value => {
      this.semasters = JSON.parse(value)  ;
    });
  }
 

}
