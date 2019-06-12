import { Component, OnInit,Input,OnDestroy} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { TestProcessing } from '../test-processing';
import { ProcessingTest } from '../processing-test'
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-thi-thi',
  templateUrl: './thi-thi.component.html',
  styleUrls: ['./thi-thi.component.scss']
})
export class ThiThiComponent implements OnInit {
  questionContent: string;
  answerContent1: string;
  answerContent2: string;
  answerContent3: string;
  answerContent4: string;
  i: number = 0;
  j: number = 0;
  reload: boolean = true;
  question: any;
  checkItem1: boolean;
  checkItem2: boolean;
  checkItem3: boolean;
  checkItem4: boolean;
  array2: object[] = [];
  a: boolean = true;
  testProcessings: TestProcessing;
  array: object[];
  arrayAnswer: object[] = [];
  
  private intervalId = 0;
  message = '';
  remainingTime: number;
  // dataSource = new  MatTableDataSource<TestProcessing>(this.testProcessings);
  constructor(private semaster: FormBuilder, private fb: FormBuilder, private http: HttpClient, private router: Router, public dialog: MatDialog, public activateRoute: ActivatedRoute) { }
  @Input()
  seconds = 200;

  clearTimer() {
    clearInterval(this.intervalId);
  }
  ngOnInit() {
    this.http.get<string>('http://localhost:65170/api/SemesterExam/1?IsgetTestProcessing').subscribe(
      value => {
        this.testProcessings = JSON.parse(value);
        console.log(value);
        console.log(this.testProcessings.Questions);
        console.log(this.testProcessings.Questions[0].Content);
        this.questionContent = this.testProcessings.Questions[this.i].Content;
        this.question = this.testProcessings.Questions[this.i];
        console.log(this.questionContent);
        console.log(this.testProcessings.Questions[this.i].Answers[0].Content);
        this.array = this.testProcessings.Questions;
        this.answerContent1 = this.testProcessings.Questions[this.i].Answers[this.j].Content;
        this.answerContent2 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;
        this.answerContent3 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;
        this.answerContent4 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;
      }
    )


    this.reset();
    this.start();

  }
  ngOnDestroy() {
    this.clearTimer();
  }
  start() {
    this.countDown();
    if (this.remainingTime <= 0) {
      this.remainingTime = this.seconds;
    }
  }
  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.remainingTime} seconds`;
  }
  reset() {
    this.clearTimer();
    this.remainingTime = this.seconds;
    this.message = `Click start button to start the Countdown`;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.remainingTime -= 1;
      if (this.remainingTime === 0) {
        confirm('Time out');
       this.message = 'Blast off!';
      
        this.clearTimer(); // thay bang goi den ham` ket qua thi
      } else {
        this.message = `T-${this.remainingTime} seconds and counting`;
      }
    }, 1000);
  }
  Prev() {

    this.checkItem1 = false;
    this.checkItem2 = false;
    this.checkItem3 = false;
    this.checkItem4 = false;
    this.j = 0;
    this.i <= 0 ? this.i = 0 : this.i--;


    console.log(this.testProcessings.Questions)
    console.log(this.testProcessings.Questions[0].Content)
    this.questionContent = this.testProcessings.Questions[this.i].Content;
    console.log(this.questionContent);
    console.log(this.testProcessings.Questions[this.i].Answers[0].Content);
    this.answerContent1 = this.testProcessings.Questions[this.i].Answers[this.j].Content;
    this.answerContent2 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;
    this.answerContent3 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;
    this.answerContent4 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;
    this.question = this.testProcessings.Questions[this.i];
    console.log('contains:', this.containsObject(this.testProcessings.Questions[this.i].Answers[1], this.arrayAnswer))

    if (this.containsObject(this.testProcessings.Questions[this.i].Answers[0], this.arrayAnswer)) {
      this.checkItem1 = true;
      console.log('work')
    }
    if (this.containsObject(this.testProcessings.Questions[this.i].Answers[1], this.arrayAnswer)) {
      this.checkItem2 = true;
    }
    if (this.containsObject(this.testProcessings.Questions[this.i].Answers[2], this.arrayAnswer)) {
      this.checkItem3 = true;
    }
    if (this.containsObject(this.testProcessings.Questions[this.i].Answers[3], this.arrayAnswer)) {
      this.checkItem3 = true;
    }
    if (this.CheckListAnswer(this.testProcessings.Questions[this.i].Answers[0], this.arrayAnswer)) {
      this.checkItem1 = true;
    }
    if (this.CheckListAnswer(this.testProcessings.Questions[this.i].Answers[1], this.arrayAnswer)) {
      this.checkItem2 = true;
    }
    if (this.CheckListAnswer(this.testProcessings.Questions[this.i].Answers[2], this.arrayAnswer)) {
      this.checkItem3 = true;
    }
    if (this.CheckListAnswer(this.testProcessings.Questions[this.i].Answers[3], this.arrayAnswer)) {
      this.checkItem3 = true;
    }
    console.log('Checklistanswer:' + this.CheckListAnswer(this.testProcessings.Questions[this.i].Answers[1], this.arrayAnswer));


    console.log('CI' + this.checkItem1);
    console.log('array2', this.array2);
    this.reload = true;


  }

  Next() {
    this.checkItem1 = false;
    this.checkItem2 = false;
    this.checkItem3 = false;
    this.checkItem4 = false;
    this.j = 0;
    this.i >= this.testProcessings.Questions.length - 1 ? this.i = this.testProcessings.Questions.length - 1 : this.i++;

    this.questionContent = this.testProcessings.Questions[this.i].Content;
    this.answerContent1 = this.testProcessings.Questions[this.i].Answers[this.j].Content;
    this.answerContent2 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;
    this.answerContent3 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;
    this.answerContent4 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;
    this.question = this.testProcessings.Questions[this.i];
    console.log(this.question);
    console.log('contains:', this.containsObject(this.testProcessings.Questions[this.i].Answers[0], this.arrayAnswer))
    console.log('answer:', this.testProcessings.Questions[this.i].Answers[0]);
    console.log('aray answer:', this.arrayAnswer);


    if (this.containsObject(this.testProcessings.Questions[this.i].Answers[0], this.arrayAnswer)) {
      this.checkItem1 = true;
      console.log('work' + this.checkItem1)
    }
    if (this.containsObject(this.testProcessings.Questions[this.i].Answers[1], this.arrayAnswer)) {
      this.checkItem2 = true;
    }
    if (this.containsObject(this.testProcessings.Questions[this.i].Answers[2], this.arrayAnswer)) {
      this.checkItem3 = true;
    }
    if (this.containsObject(this.testProcessings.Questions[this.i].Answers[3], this.arrayAnswer)) {
      this.checkItem4 = true;
    }
    if (this.CheckListAnswer(this.testProcessings.Questions[this.i].Answers[0], this.arrayAnswer)) {
      this.checkItem1 = true;
    }
    if (this.CheckListAnswer(this.testProcessings.Questions[this.i].Answers[0], this.arrayAnswer)) {
      this.checkItem1 = true;
    }
    if (this.CheckListAnswer(this.testProcessings.Questions[this.i].Answers[1], this.arrayAnswer)) {
      this.checkItem2 = true;
    }
    if (this.CheckListAnswer(this.testProcessings.Questions[this.i].Answers[2], this.arrayAnswer)) {
      this.checkItem3 = true;
    }
    if (this.CheckListAnswer(this.testProcessings.Questions[this.i].Answers[3], this.arrayAnswer)) {
      this.checkItem3 = true;
    }
    console.log('Checklistanswer:' + this.CheckListAnswer(this.testProcessings.Questions[this.i].Answers[0], this.arrayAnswer));

    console.log('CI' + this.checkItem1);
  }

  check1() {
    this.checkItem1 = true;
    this.checkItem2 = false;
    this.checkItem3 = false;
    this.checkItem4 = false;
    if (!this.containsObject(this.question, this.array2)) {
      this.array2.push(this.question);

    }
    console.log(this.array2);
    this.reload = true;
    console.log(this.reload);
    if (!this.CheckListAnswer(this.testProcessings.Questions[this.i].Answers[0], this.arrayAnswer))
      this.arrayAnswer.push(this.testProcessings.Questions[this.i].Answers[0]);
    console.log('array answer:', this.arrayAnswer);
  }
  check2() {
    this.checkItem1 = false;
    this.checkItem2 = true;
    this.checkItem3 = false;
    this.checkItem4 = false;

    if (!this.containsObject(this.question, this.array2)) {
      this.array2.push(this.question);
      console.log(this.containsObject(this.question, this.array2));
    }
    if (!this.CheckListAnswer(this.testProcessings.Questions[this.i].Answers[1], this.arrayAnswer))
      this.arrayAnswer.push(this.testProcessings.Questions[this.i].Answers[1]);
    console.log(this.array2);
    this.a = false;
    this.reload = true;
  }
  dcm() {
    if (this.checkItem1 == false)
      this.checkItem1 = true;
    else
      this.checkItem1 = false;
    console.log('abc ' + this.containsObject(this.question, this.array2))


  }
  check3() {
    this.checkItem1 = false;
    this.checkItem2 = false;
    this.checkItem3 = true;
    this.checkItem4 = false;
    if (!this.containsObject(this.question, this.array2)) {
      this.array2.push(this.question);
    }
    if (!this.CheckListAnswer(this.testProcessings.Questions[this.i].Answers[2], this.arrayAnswer))
      this.arrayAnswer.push(this.testProcessings.Questions[this.i].Answers[2]);
    console.log(this.array2);
    this.reload = true;
  }
  check4() {
    this.checkItem1 = false;
    this.checkItem2 = false;
    this.checkItem3 = false;
    this.checkItem4 = true;
    if (!this.containsObject(this.question, this.array2)) {
      this.array2.push(this.question)
    }
    if (!this.CheckListAnswer(this.testProcessings.Questions[this.i].Answers[3], this.arrayAnswer))
      this.arrayAnswer.push(this.testProcessings.Questions[this.i].Answers[3]);
    console.log(this.array2);
    this.reload = true;
  }
  containsObject(obj, list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }
    return false;
  }
  CheckListAnswer(obj, List: []) {
    for (var i = 0; i < List.length; i++) {
      if (List[i].Id == obj.Id) {
        return true;
      }
    }
    return false;
  }
  summit() {
    confirm('aa');
    // this.http.post('http://localhost:65170/api/SemesterExam?isSubmit=a&testId=1')
  }
}
