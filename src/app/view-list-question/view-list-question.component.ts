import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../question';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-list-question',
  templateUrl: './view-list-question.component.html',
  styleUrls: ['./view-list-question.component.scss']
})
export class ViewListQuestionComponent implements OnInit {
  searchString: string;
  questions: Question[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get<string>('http://localhost:65170/api/question/').subscribe(value => {
      this.questions = JSON.parse(value);
    });
  }
  deleteQuestion(questionId: string) {
    this.http.delete('http://localhost:65170/api/question/' + questionId).subscribe(() => {
      this.questions = this.questions.filter(question => question.Id !== questionId);
    });
  }
  onSearch() {
    const searchObject = {
      PageIndex: 1,
      PageSize: 10,
      searchString: this.searchString
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post<string>('http://localhost:65170/api/question?action=search', JSON.stringify(searchObject), httpOptions).subscribe(value => {
      this.questions = JSON.parse(value);
    });
  }
}
