import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../question';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-detail-question',
  templateUrl: './detail-question.component.html',
  styleUrls: ['./detail-question.component.scss']
})
export class DetailQuestionComponent implements OnInit {

  Question: Question;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private activedRoute: ActivatedRoute) { }
  question: Question;
  ngOnInit() {

    const IdQuestion = this.activedRoute.snapshot.paramMap.get('Id')
    this.http.get<string>('http://localhost:65170/api/question/' + IdQuestion).subscribe(value => {
      console.log(value);
      //  this.ctForm.patchValue( JSON.parse(value));
      this.Question = JSON.parse(value);

    });
  }
}



