import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailExam } from '../detailExams';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-detail-exam-customer',
  templateUrl: './detail-exam-customer.component.html',
  styleUrls: ['./detail-exam-customer.component.scss']
})
export class DetailExamCustomerComponent implements OnInit {
  list: DetailExam;

  notify = true;
  Users: string;
  LisUser;
  UserId: string;
  UserName: string;
  chuoi: string;
  date: string;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private http: HttpClient,
              private myservice: MyserviceService,
              private router: Router,
              private activedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('2');
    });
  }

  ngOnInit() {

    const IdQuestion = this.activedRoute.snapshot.paramMap.get('id');
    this.date = moment(new Date()).format('YYYY');
    this.http.get<string>('http://localhost:65170/ExamDetails/' + IdQuestion, {headers: http()}).subscribe(
      value => {

        this.list = JSON.parse(value);
        console.log(IdQuestion);
        console.log(value);
        this.chuoi = '/thi/1/' + IdQuestion + '/thi';
      });


    if (sessionStorage.getItem('user')) {
      this.Users = sessionStorage.getItem('user');
      this.LisUser = this.Users.split(',');
      this.UserName = this.LisUser[1];
      this.UserId = this.LisUser[0];


    } else {
      this.Users = null;
    }

  }

  listExam(id) {

  }

  Logout() {
    sessionStorage.removeItem('currentPermission');
    this.router.navigate(['/']);


    sessionStorage.removeItem('user');
  }


  test() {
    const checked = localStorage.getItem('SecondTest');
    if (checked == null) {
      const time = new Date();
      console.log(time.getHours());
      const getdate = time.getHours() * 60 + time.getMinutes();
      localStorage.setItem('SecondTest', getdate.toString());
      localStorage.setItem('startTimeTest', time.getTime().toString());
    }

  }

}
