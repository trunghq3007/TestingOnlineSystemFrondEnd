import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Exam } from 'src/app/exam';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamListComponent } from '../exam-list/exam-list.component';

@Component({
  selector: 'app-exam-update',
  templateUrl: './exam-update.component.html',
  styleUrls: ['./exam-update.component.scss']
})

export class ExamUpdateComponent implements OnInit {
  editForm:FormGroup;
  exams:Exam;
  validateForm() {
    if (this.editForm.invalid) {
      this.editForm.get('NameExam').markAsTouched();
      this.editForm.get('CreateBy').markAsTouched();
      this.editForm.get('QuestionNumber').markAsTouched();
      
      return;
    }
    // do something else
}
  get NameExam(): FormControl {
    return this.editForm.get('NameExam') as FormControl;
  }

  get QuestionNumber(): FormControl {
    return this.editForm.get('QuestionNumber') as FormControl;
  }

  get CreateBy(): FormControl {
    return this.editForm.get('CreateBy') as FormControl;
  }
  get Status(): FormControl {
    return this.editForm.get('Status') as FormControl;
  }
 

  get Note(): FormControl {
    return this.editForm.get('Note') as FormControl;
  }
  constructor(private http:HttpClient,
    private ac:ActivatedRoute,private router:Router
    ,private fb:FormBuilder
    ) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      NameExam: ['', [
        Validators.required,
        
      ]],
      QuestionNumber: ['', [
        Validators.required,
        Validators.min(1)
        
      ]],
      CreateBy: ['', [
        Validators.required,
       
      ]],
      Status: ['', [
        Validators.required,

      ]],
     
      Note: ['', [
        Validators.required,
        

      ]],
    });
    const examID = this.ac.snapshot.paramMap.get('Id');
    this.http.get<string>('http://localhost:65170/api/Exam/' +examID).subscribe(value => {
      this.exams = JSON.parse(value);
      this.editForm.patchValue(JSON.parse(value));
    });
  }
  onSubmit(){
    if (this.editForm.valid) {
      const value = this.editForm.value;
      const formData = {
        ...this.exams,
        ...value
      };
   
      this.http.put
        ('http://localhost:65170/api/Exam/'+formData.Id,formData)
      
        .subscribe({
          next: (res) => {
            if(res==true){
              console.log(res);
              confirm('Update success!');
            }else if(res == false){
              confirm('Update Flalse!');
            }
          
          },
          error: (err) => {
            console.log(err);
            console.log('false');
          }
        });
       
     
        

        
    
    }
  }

}
