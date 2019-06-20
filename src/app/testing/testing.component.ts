import { Component, OnInit, Input, OnDestroy, Pipe } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Question } from '../question';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { TestProcessing } from '../test-processing';
import { ProcessingTest } from '../processing-test'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountdownModule } from 'ngx-countdown';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
@Pipe({
  name: 'minuteSeconds'
})
export class TestingComponent implements OnInit {

  constructor(private semaster: FormBuilder, private fb: FormBuilder, private http: HttpClient, private router: Router, public dialog: MatDialog, public activateRoute: ActivatedRoute) { }
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
  arrayId=[];
  mang=[];
  checked=true;
  ngOnInit() {
    this.http.get<string>('http://localhost:65170/api/SemesterExam/1?IsgetTestProcessing').subscribe(
      value => {
        this.testProcessings = JSON.parse(value);
        this.questions = this.testProcessings.Questions;
        console.log(this.testProcessings);
        console.log(this.questions = this.testProcessings.Questions);
        this.counting = this.testProcessings.TestTime;
       
        this.reset();
        this.start();
      })
  }
  Onclick(id, btnid) {
 
    this.a = this.questions.findIndex(d => d.Id == btnid);
    this.answer = this.questions[this.a].Answers;
    let dem = 0;
    for (var i = 0; i < this.questions[this.a].Answers.length; i++) {

      if (document.getElementById("check" + this.questions[this.a].Answers[i].Id).checked) {
        dem++;
        if(this.arrayId.indexOf(this.questions[this.a].Answers[i].Id)==-1)
             {
                this.arrayId.push(this.questions[this.a].Answers[i].Id);
               
           }
        if (dem > 0) {
          document.getElementById("btn" + btnid).classList.add("button-selected");
        }
      }
    
    }

    if (!document.getElementById("check" + id).checked) {
      dem--;
      for(var n=0;n<this.arrayId.length;n++)
      {
        if(this.arrayId[n]==id)
        {
          this.arrayId.splice(n,1);
          console.log(this.arrayId)
        }
      } 
      if (dem === -1) {
        document.getElementById("btn" + btnid).classList.remove("button-selected");
      }
    }
  }
  scroll(btnid) {
    var elmnt = document.getElementById("table" + btnid);
    elmnt.scrollIntoView();
  }
  clearTimer() {
    clearInterval(this.intervalId);
  }
  start() {
    this.countDown();
    if (this.remainingTime <= 0) {
      this.remainingTime = this.counting;
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
     
      if (this.remainingTime === 0) {
       
        this.message = 'Blast off!';

        this.router.navigate(['/thi/8/2/ketqua']);
        console.log(this.router.navigate(['/thi/8/2/ketqua']));
        

        this.clearTimer(); // thay bang goi den ham` ket qua thi
      } else {
        this.message = `T-${this.remainingTime} seconds and counting`;
      }
    }, 1000);

  }
  summit() {
    const Idtest = this.testProcessings.Id;
    console.log(Idtest);
     this.http.post('http://localhost:65170/SemesterExam/'+Idtest , JSON.stringify(this.arrayId), httpOptions).subscribe(
       value => (console.log(value))
 
     )
 
    
   }
}
