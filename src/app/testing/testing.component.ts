import { Component, OnInit, Pipe } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Question } from '../question';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TestProcessing } from '../test-processing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyserviceService } from '../myservice.service';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

// tslint:disable-next-line: use-pipe-transform-interface
@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
@Pipe({
  name: 'minuteSeconds'
})
export class TestingComponent implements OnInit {
  Users: string;
  LisUser;
  UserId: string;
  UserName: string;

  constructor(private myservice: MyserviceService,
              private semaster: FormBuilder,
              private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              public dialog: MatDialog,
              public activateRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('2');
    });
  }


  testProcessings: TestProcessing;
  questions: Question[];
  i: number;
  j: number;
  content: string;
  a: number;
  b: number;
  answer = [];
  counting: number;
  remainingTime: number;
  private intervalId = 0;
  message = '';
  arrayId = [];
  checked = true;
  EndTest;
  startTest;
  time;
  second: number;
  NameExam: string;
  testCount: number;
  countdown: string;
  Idtest = this.activateRoute.snapshot.paramMap.get('TestId');

  countDownText = {
    Year: '',
    Month: '',
    Weeks: '',
    Days: '',
    Hours: '',
    Minutes: '',
    Seconds: '',
    MilliSeconds: '',
  };

  ngOnInit() {
    this.http.get<string>('http://localhost:65170/api/SemesterExam/' + this.Idtest + '?IsgetTestProcessing', httpOptions).subscribe(
      value => {
        this.testProcessings = JSON.parse(value);
        this.testCount = this.testProcessings.Questions.length;
        console.log(this.testCount);
        this.questions = this.testProcessings.Questions;
        console.log(this.testProcessings);
        console.warn(this.questions);
        this.second = this.testProcessings.TestTime;
        const now = new Date();
        const startTest = parseInt(localStorage.getItem('startTimeTest'), 10);
        const endTest = now.getTime();
        now.setMinutes(now.getMinutes() + this.second);
        this.countdown = moment(now.getTime() - (endTest - startTest)).format('lll');
        console.log(this.countdown);
        this.NameExam = this.testProcessings.TestName;
        console.log(this.NameExam);
        this.reset();
        this.start();

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

  Onclick(id, btnid) {

    this.a = this.questions.findIndex(d => d.Id == btnid);
    this.answer = this.questions[this.a].Answers;
    let dem = 0;
    for (let i = 0; i < this.questions[this.a].Answers.length; i++) {
      const getValue = document.getElementById('check' + this.questions[this.a].Answers[i].Id) as HTMLInputElement;
      if (getValue.checked) {
        dem++;
        if (this.arrayId.indexOf(this.questions[this.a].Answers[i].Id) == -1) {
          this.arrayId.push(this.questions[this.a].Answers[i].Id);

        }
        if (dem > 0) {
          document.getElementById('btn' + btnid).classList.add('button-selected');
        }
      }

    }
    const getValue1 = document.getElementById('check' + id) as HTMLInputElement;
    if (!getValue1.checked) {
      dem--;
      for (let n = 0; n < this.arrayId.length; n++) {
        if (this.arrayId[n] == id) {
          this.arrayId.splice(n, 1);
          console.log(this.arrayId);
        }
      }
      if (dem === -1) {
        document.getElementById('btn' + btnid).classList.remove('button-selected');
      }
    }
  }

  scroll(btnid) {
    const elmnt = document.getElementById('table' + btnid);
    elmnt.scrollIntoView();
  }

  clearTimer() {
    clearInterval(this.intervalId);
  }

  start() {
    this.countDown();
    if (this.remainingTime <= 0) {
      this.remainingTime = this.second;
    }
  }

  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.remainingTime} seconds`;
  }

  reset() {
    this.clearTimer();
    this.remainingTime = this.counting;
    this.message = `Click start button to start the Countdown`;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.remainingTime -= 1;

      let session = null;
      if (localStorage.getItem('SecondTest')) {
        session = localStorage.getItem('SecondTest');
      } else {
        session = 0;
      }

      const a = new Date();
      this.EndTest = a.getHours() * 60 + a.getMinutes();

      this.startTest = +session;
      const isOverTimeTest = this.EndTest - this.startTest >= this.second;
      if (isOverTimeTest) {
        const arr = this.arrayId;
        this.http.post('http://localhost:65170/SemesterExam/submid/' +
          this.Idtest + '?userID=' + this.UserId, JSON.stringify(arr), httpOptions).subscribe(
          value => {
            localStorage.removeItem('SecondTest');
            localStorage.removeItem('startTimeTest');
            this.router.navigate(['/thi/' + this.Idtest + '/' + this.Idtest + '/ketqua']);
            window.clearInterval(this.intervalId);
          }
        );
      }
    }, 1000);

  }

  summit() {
    const arr = this.arrayId;

    let contentsArr = [];
    if (confirm('Bạn có muốn nộp bài')) {
      this.http.post('http://localhost:65170/api/TestAssignment?testId=' + this.Idtest + '&userId=' + this.UserId
        , JSON.stringify(this.questions), httpOptions).subscribe(
        value => (console.log(value))
      );
      this.http.post('http://localhost:65170/SemesterExam/submid/' +
        this.Idtest + '?userID=' + this.UserId, JSON.stringify(arr), httpOptions).subscribe(
        value => {
          localStorage.removeItem('SecondTest');
          localStorage.removeItem('startTimeTest');
          this.router.navigate(['/thi/' + this.Idtest + '/' + this.Idtest + '/ketqua']);
          window.clearInterval(this.intervalId);
        }
      );
    } else {
      contentsArr = [];
    }


  }


}
