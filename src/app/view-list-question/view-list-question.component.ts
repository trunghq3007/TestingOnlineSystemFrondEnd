import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../question';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-list-question',
  templateUrl: './view-list-question.component.html',
  styleUrls: ['./view-list-question.component.scss']
})
export class ViewListQuestionComponent implements OnInit {
  questions: Question[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get<string>('http://localhost:65170/api/question').subscribe(value => {
      this.questions = JSON.parse(value);
    });
  }

}
