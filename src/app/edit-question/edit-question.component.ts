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

  get QuestionType(): FormControl {
    return this.ctForm.get('QuestionType') as FormControl;
  }
  get Suggestion(): FormControl {
    return this.ctForm.get('Suggestion') as FormControl;
  }
  get Level(): FormControl {
    return this.ctForm.get('Level') as FormControl;
  }
  get Tags(): FormControl {
    return this.ctForm.get('Tags') as FormControl;
  }
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
      Media: '',
      Status: '1',
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
      valueQuestion.Category = this.categoriesFormApi.filter(s => s.Id == valueQuestion.Category.Id);
      valueQuestion.Category = valueQuestion.Category.length > 0 ? valueQuestion.Category[0] : {};
      valueQuestion.Answers.map(s => s.IsTrue = s.IsTrue ? 1 : 0);
      console.log(valueQuestion);

      this.http.post('http://localhost:65170/api/question/', JSON.stringify(valueQuestion), httpOptions)
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
  }
  ngOnInit() {
    this.getApiTags();
    this.getApiCategories();


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
          QuestionType: '',
          Suggestion: '',
          Level: qs.Level,
          Content: qs.Content,//[qs.Content, [Validators.required]]
          TagId: '',
          Answers: this.fb.array(
            [
              this.createAnswer()
            ]),
        }
      );
    });

  }
}

