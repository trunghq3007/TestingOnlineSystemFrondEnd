import { Component, OnInit } from '@angular/core';
import { Form, NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Exam } from 'src/app/exam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss']
})
export class CreateExamComponent implements OnInit {

  public Editor = ClassicEditorBuild;
  
  examForm: FormGroup;
  number = "^([1-9][0-9]{0,3}|^2000)$";
  regex = "^[A-Za-z0-9\s_]+$";
  CategoryFormApi = [];
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  get NameExam(): FormControl {
    return this.examForm.get('NameExam') as FormControl;
  }
  get CreateBy(): FormControl {
    return this.examForm.get('CreateBy') as FormControl;
  }
  get QuestionNumber(): FormControl {
    return this.examForm.get('QuestionNumber') as FormControl;
  }
  get Status(): FormControl {
    return this.examForm.get('Status') as FormControl;
  }
  get SpaceQuestionNumber(): FormControl {
    return this.examForm.get('SpaceQuestionNumber') as FormControl;
  }
  get CreateAt(): FormControl {
    return this.examForm.get('CreateAt') as FormControl;
  }
  get CategoryId(): FormGroup {
    return this.examForm.get('CategoryId') as FormGroup;
  }
  get Categorys(): FormGroup {
    return this.examForm.get('Categorys') as FormGroup;
  }
  get Note(): FormControl {
    return this.examForm.get('Note') as FormControl;
  }

  ngOnInit() {
    this.getApiCategory();
    this.examForm = this.fb.group({
      NameExam: ['', [Validators.required, Validators.pattern, Validators.maxLength(50), Validators.minLength(5)]],
      CreateBy: ['', [Validators.required]],
      QuestionNumber: ['', [Validators.required, Validators.pattern]],
      //status: ['', [{value: 'false', disabled: true}]],
      Status: [''],
      SpaceQuestionNumber: ['', [Validators.required, Validators.pattern]],
      CreateAt: [''],
        CategoryId: [''],
      Note: [''],



    });

  }
  getApiCategory() {
    this.http.get<string>('http://localhost:65170/api/Category/').subscribe(value => {
      this.CategoryFormApi = JSON.parse(value);
    });
  }
  validateForm() {
    if (this.examForm.invalid) {
      this.examForm.get('NameExam').markAsTouched();
      this.examForm.get('CreateBy').markAsTouched();
      this.examForm.get('QuestionNumber').markAsTouched();
      this.examForm.get('SpaceQuestionNumber').markAsTouched();
      // this.examForm.get('CategoryId').markAsTouched();

      return;
    }
  
  }
  onSubmit() {
    
    console.log(this.examForm.value);
    if (this.examForm.valid) {
     
      const value = this.examForm.value;
      value.Category = this.CategoryFormApi.filter(s => s.Id == value.CategoryId);
      value.Category = value.Category.length > 0 ? value.Category[0] : null;
      this.http.post<string>('http://localhost:65170/api/Exam/', JSON.stringify(value), httpOptions).subscribe({
        next: (res) => {
          console.log(res);
          confirm("Insert success!");
          console.log('success');
          this.examForm.reset();
        },

        error: (err) => {
          console.log(err);
          confirm("Insert false!");
          console.log('false');
          
        }
        
        
      });
    }
  }





}
