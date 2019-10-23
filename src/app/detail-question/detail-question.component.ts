import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../question';
import { FormBuilder } from '@angular/forms';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-detail-question',
  templateUrl: './detail-question.component.html',
  styleUrls: ['./detail-question.component.scss']
})
export class DetailQuestionComponent implements OnInit {

  Question: Question;
  question: Question;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private http: HttpClient,
              private myservice: MyserviceService,
              private fb: FormBuilder,
              private router: Router,
              private activedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
    });
  }

  ngOnInit() {
    const IdQuestion = this.activedRoute.snapshot.paramMap.get('id');
    // const IdQuestion = this.activedRoute.snapshot.paramMap.get('Id')
    this.http.get<string>('http://localhost:65170/api/question/' + IdQuestion, {headers: http()}).subscribe(value => {

      console.log(value);

      this.Question = JSON.parse(value).Data;


    });
  }
}



