import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { TestProcessing } from '../test-processing';
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
  checkItem1 : boolean = false;
  checkItem2 : boolean = false;
  checkItem3 : boolean = false;
  checkItem4 : boolean = false;
  testProcessings: TestProcessing;
  // dataSource = new  MatTableDataSource<TestProcessing>(this.testProcessings);
  constructor(private semaster: FormBuilder, private fb: FormBuilder, private http: HttpClient, private router: Router, public dialog: MatDialog, public activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.http.get<string>('http://localhost:65170/api/SemesterExam/1?IsgetTestProcessing').subscribe(
      value => {
        this.testProcessings = JSON.parse(value);
        console.log(value);
        console.log(this.testProcessings.Questions)
        console.log(this.testProcessings.Questions[0].Content)
        this.questionContent = this.testProcessings.Questions[this.i].Content;
        console.log(this.questionContent);
        console.log(this.testProcessings.Questions[this.i].Answers[0].Content);
        this.answerContent1 = this.testProcessings.Questions[this.i].Answers[this.j].Content;
        this.answerContent2 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;
        this.answerContent3 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;
        this.answerContent4 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;

      }
    )

  }
  Prev() {
    this.checkItem1=false;
    this.checkItem2 = false;
    this.checkItem3 = false;
    this.checkItem4 = false;
    this.j = 0;
    this.i <= 0 ? this.i = 0 : this.i--;
    this.http.get<string>('http://localhost:65170/api/SemesterExam/1?IsgetTestProcessing').subscribe(
      value => {
        this.testProcessings = JSON.parse(value);
        console.log(value);
        console.log(this.testProcessings.Questions)
        console.log(this.testProcessings.Questions[0].Content)
        this.questionContent = this.testProcessings.Questions[this.i].Content;
        console.log(this.questionContent);
        console.log(this.testProcessings.Questions[this.i].Answers[0].Content);
        this.answerContent1 = this.testProcessings.Questions[this.i].Answers[this.j].Content;
        this.answerContent2 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;
        this.answerContent3 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;
        this.answerContent4 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;

      }
    )
  }
  Next() {
    this.checkItem1=false;
    this.checkItem2 = false;
    this.checkItem3 = false;
    this.checkItem4 = false;
    this.j = 0;
    this.i >= this.testProcessings.Questions.length -1? this.i = this.testProcessings.Questions.length-1 : this.i++;

    this.questionContent = this.testProcessings.Questions[this.i].Content;
    this.answerContent1 = this.testProcessings.Questions[this.i].Answers[this.j].Content;
    this.answerContent2 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;
    this.answerContent3 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;
    this.answerContent4 = this.testProcessings.Questions[this.i].Answers[this.j++].Content;



  }
  check1()
  {
      this.checkItem1 = true;
      this.checkItem2 = false;
      this.checkItem3 = false;
      this.checkItem4 = false;
  }
  check2()
  {
      this.checkItem1 = false;
      this.checkItem2 = true;
      this.checkItem3 = false;
      this.checkItem4 = false;
  }
  check3()
  {
      this.checkItem1 = false;
      this.checkItem2 = false;
      this.checkItem3 = true;
      this.checkItem4 = false;
  }
  check4()
  {
      this.checkItem1 = false;
      this.checkItem2 = false;
      this.checkItem3 = false;
      this.checkItem4 = true;
  }

}
