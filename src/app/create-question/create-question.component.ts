import { Component, OnInit } from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../question';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  public Editor = ClassicEditorBuild;
  public componentEvents: string[] = [];
  Questions: Question[] = [];
  answer: FormGroup;
  answers: FormArray;
  tagsFormApi:[];
  categoriesFormApi:[];
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
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  createAnswer(): FormGroup {
    return this.fb.group({
      Media: '',
      Status: '1',
      Content: ['', [Validators.required]],
      IsTrue: '',
    });
  };
  addAnswer(): void {
    this.answers = this.ctForm.get('Answers') as FormArray;
    this.answers.push(this.createAnswer());
  };
  removeAnswer(i){
    this.answers = this.ctForm.get('Answers') as FormArray;
    this.answers.removeAt(i);
  }
  
  getApiTags(){
    this.http.get<string>('http://localhost:65170/api/tag/').subscribe(value => {
      this.tagsFormApi = JSON.parse(value);
    });
  }
  getApiCategories(){
    this.http.get<string>('http://localhost:65170/api/category/').subscribe(value => {
      this.categoriesFormApi = JSON.parse(value);
    });
  }
  saveQuestion() {
    
   
    
    console.log(this.ctForm.value);
    
    if (this.ctForm.valid) {
      let valueQuestion = this.ctForm.value;
      const length  = valueQuestion.TagId.length;
     let idTags = valueQuestion.TagId;
      let arrTags = [];
      for(let i = 0 ; i<length;i++){
        console.log(idTags[i].Id);
        let tag = this.tagsFormApi.filter(s=>s.Id==idTags[i]);
        arrTags = [...arrTags,...tag];
      }
      valueQuestion.Tags = arrTags;
      valueQuestion.Category = this.categoriesFormApi.filter(s=>s.Id==valueQuestion.Category.Id);
      valueQuestion.Category = valueQuestion.Category.length >0 ? valueQuestion.Category[0]:{};
      valueQuestion.Answers.map(s=>s.IsTrue = s.IsTrue ? 1: 0);
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
    this.ctForm = this.fb.group(
      {
        Category: this.fb.group({ 
          Id: '2',
        }),
        // Media: '',
        QuestionType: '1',
        Suggestion: '',
        Level: '1',
        Content: ['', [Validators.required]],
        TagId: '',
        Answers: this.fb.array(
          [
            this.createAnswer()
          ]),
      }
    );

    ////////
//     const IdQuestion = this.route.snapshot.paramMap.get('id');
//     this.http.get<string>('http://localhost:65170/api/question/' + IdQuestion).subscribe(value => {
//       this.ctForm.patchValue( JSON.parse(value));
//     });
};
 
  

}
