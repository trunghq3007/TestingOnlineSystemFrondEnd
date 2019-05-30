import { Component, OnInit } from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../question';
import { Router, ActivatedRoute } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
////

export class EditQuestionComponent implements OnInit {
  public Editor = ClassicEditorBuild;
  public componentEvents: string[] = [];
  Questions: Question[] = [];
  answer: FormGroup;
  answers: FormArray;
  tagsFormApi: [];
  categoriesFormApi: [];
  ctForm: FormGroup;
  //  submitted = false;

  get Content(): FormControl {
    return this.ctForm.get('Content') as FormControl;
  }
  get ContentAnswer(): FormControl {
    return this.ctForm.get('ContentAnswer') as FormControl;
  }
  get Answers(): FormArray {
    return this.ctForm.get('Answers') as FormArray;
  }
  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private activedRoute: ActivatedRoute) { }

  createAnswer(): FormGroup {
    return this.fb.group({
      Id:'0',
      Media: '',
      Status: '',
      Content: ['', [Validators.required]],
      IsTrue: '',
    });
  }
  addAnswer(): void {
    this.answers = this.ctForm.get('Answers') as FormArray;
    this.answers.push(this.createAnswer());
  }
  removeAnswer(i) {
    this.answers = this.ctForm.get('Answers') as FormArray;
    this.answers.removeAt(i);
  }

  getApiTags() {
    this.http.get<string>('http://localhost:65170/api/tag/').subscribe(value => {
      this.tagsFormApi = JSON.parse(value);
    });
  }
  getApiCategories() {
    this.http.get<string>('http://localhost:65170/api/category/').subscribe(value => {
      this.categoriesFormApi = JSON.parse(value);
    });
  }


  saveQuestion() {
    console.log(this.ctForm.value);
    if (this.ctForm.valid) {
      const valueQuestion = this.ctForm.value;
      const length = valueQuestion.TagId.length;
      const idTags = valueQuestion.TagId;
      let arrTags = [];
      for (let i = 0; i < length; i++) {
        console.log(idTags[i].Id);
        const tag = this.tagsFormApi.filter(s => s.Id == idTags[i]);
        arrTags = [...arrTags, ...tag];
      }
      valueQuestion.Tags = arrTags;
      valueQuestion.Category = this.categoriesFormApi.filter(s => s.Id == valueQuestion.CategoryId);
      valueQuestion.Category = valueQuestion.Category.length > 0 ? valueQuestion.Category[0] : {};
      valueQuestion.Answers.map(s => s.IsTrue = s.IsTrue ? 1 : 0);
      console.log(valueQuestion);
      debugger;
      const IdQuestion = this.activedRoute.snapshot.paramMap.get('Id')
      this.http.put<string>('http://localhost:65170/api/question/' + IdQuestion, JSON.stringify(valueQuestion), httpOptions)
        .subscribe({
          next: (res) => {
            this.http.get<string>('http://localhost:65170/api/question/').subscribe(value => {
              this.Questions = JSON.parse(value);
            });
            this.ctForm.reset();
          },

          error: (err) => {
            console.error(err);
          }

        });
    }
    // this.router.navigate(['/ViewQuestionList' ]);
  }
  ngOnInit() {
    this.getApiTags();
    this.getApiCategories();
    this.ctForm = this.fb.group(
      {

        CategoryId: '',
        // Media: '',
        Type: '',
        Suggestion: '',
        Level: '',
        Content: '',
        TagId: '',
        Answers: this.fb.array(
          [

          ]),
      });

    //////
    const IdQuestion = this.activedRoute.snapshot.paramMap.get('Id')
    this.http.get<string>('http://localhost:65170/api/question/' + IdQuestion).subscribe(value => {

      const qs: Question = JSON.parse(value);
      qs.CategoryId = qs.Category.Id;
      if (qs.Tags && qs.Tags.length > 0) {
        qs.Tags.forEach(s => qs.TagsId += ',' + s.Id);
      }

      if (qs.Answers && qs.Answers.length > 0) {
        for (let i = 0; i < qs.Answers.length; i++) {
          this.addAnswer();

          let ansF = this.ctForm.get('Answers') as FormArray;
          ansF.controls[i].patchValue(qs.Answers[i]);
        }
      }
      this.ctForm.patchValue(qs);

    });

  }
}

