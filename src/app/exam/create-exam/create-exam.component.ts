import { Component, OnInit } from '@angular/core';
import { Form, NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Exam } from 'src/app/exam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { User } from 'src/app/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { http } from 'src/app/http-header';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss']
})
export class CreateExamComponent implements OnInit {
 
  name:string;
  public Editor = ClassicEditorBuild;
  // submited = false;
  // disabled = false;
  examForm: FormGroup;
  number = "^([1-9][0-9]{0,3}|^2000)$";
  // regex = "^[A-Za-z0-9@/._#] +$";

  CategoryFormApi = [];
  constructor(private fb: FormBuilder,private toar:ToastrService, private http: HttpClient, private authenticationService: AuthenticationService
    ,private route:Router ) {
   
   }
  get NameExam(): FormControl {
    return this.examForm.get('NameExam') as FormControl;
  }
  get CreateBy(): FormControl {
    return this.examForm.get('CreateBy') as FormControl;
  }
  get QuestionNumber(): FormControl {
    return this.examForm.get('QuestionNumber') as FormControl;
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
      NameExam: ['', [Validators.required, Validators.maxLength(50)]],
      CreateBy: ['',Validators.required],
      QuestionNumber: ['', [Validators.required, Validators.pattern]],
      //status: ['', [{value: 'false', disabled: true}]],
     
      SpaceQuestionNumber: ['', [Validators.required, Validators.pattern]],
      CreateAt: [''],
        CategoryId: [''],
      Note: [''],



    });
  
  }
  getApiCategory() {
    this.http.get<string>('http://localhost:65170/api/Category/',{ headers: http() }).subscribe(value => {
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
    // do something else
  }
  onSubmit() {
    
    
    if (this.examForm.valid) {
      console.log(this.examForm.value);
      const value = this.examForm.value;
      value.Category = this.CategoryFormApi.filter(s => s.Id == value.CategoryId);
      value.Category = value.Category.length > 0 ? value.Category[0] : null;
     
      this.http.post<string>('http://localhost:65170/api/Exam', JSON.stringify(value),{ headers: http() }).subscribe({
        next: (res) => {
          
       
          this.toar.success('success',' Create Exam');
          this.examForm.reset();
        },

        error: (err) => {
          this.toar.warning('false',' Create Exam');
          //this.examForm.reset();
        }
        
      });
    }
    //this.route.navigate(['/exam'])
  }





}
