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
  ctForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.getApiTags();
    // this.getApiCategories();


    //////
    const IdQuestion = this.activedRoute.snapshot.paramMap.get('Id')
    this.http.get<string>('http://localhost:65170/api/question/' + IdQuestion).subscribe(value => {

      // this.ctForm.patchValue( JSON.parse(value));
      const qs: Question = JSON.parse(value);
      console.log(qs);
      this.ctForm = this.fb.group(
        {

          Category: this.fb.group({
            Id: qs.Category.Name,
          }),
          // Media: '',
          QuestionType: qs.QuestionType,
          Suggestion: '',
          Level: qs.Level,
          Content: qs.Content,
          TagId: qs.Tags,
          // Answers: this.fb.array(
          //   [
          //     this.createAnswer()
          //   ]),
        }
      );
    });
  }

}
