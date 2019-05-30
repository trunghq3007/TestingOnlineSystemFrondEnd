import { Component, OnInit } from '@angular/core';
import { Form, NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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
  // submited = false;
  // disabled = false;
  examForm: FormGroup;
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
 
 
  get Note(): FormControl {
    return this.examForm.get('Note') as FormControl;
  }
  ngOnInit() {
    this.examForm = this.fb.group({
      NameExam: ['', [Validators.required]],
      CreateBy: ['', [Validators.required]],
      QuestionNumber: ['', [Validators.required]],
      //status: ['', [{value: 'false', disabled: true}]],
      Status: '',
      Note: ''


    });
  }
  validateForm() {
    if (this.examForm.invalid) {
      this.examForm.get('NameExam').markAsTouched();
      this.examForm.get('CreateBy').markAsTouched();
      this.examForm.get('QuestionNumber').markAsTouched();
      
      return;
    }
    // do something else
}
  onSubmit() {
    {
      if (this.examForm.valid) {
        const value = this.examForm.value;
        this.http.post('http://localhost:65170/api/Exam/', value).subscribe({
          next: (res) => {
            console.log(res);
            confirm("Insert success!");
          },
          error: (err) => {
            console.log(err);
            console.log('false');
          }

        });
        console.log(this.examForm.value);
      }
    }
  }



}
