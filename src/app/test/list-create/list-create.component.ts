import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Exam } from 'src/app/exam';
import { MatTableDataSource } from '@angular/material';
import { User } from 'src/app/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
export class exam {
  Id: number;
  NameExam: string;
  CreateBy: number;
  QuestionNumber: number;
  Status: number;
  TypeExam: string;
  CreateAt: Date;
  Note: string;
  
}
export class semaster{
  ID:number;
  SemesterName:string
}
@Component({
  selector: 'app-list-create',
  templateUrl: './list-create.component.html',
  styleUrls: ['./list-create.component.scss']
})
export class ListCreateComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  isMember = false;
  isManager = false;
  isAdmin = false;
  nameuser:string;
  exams:exam[]=[];
  form: FormGroup;
  semasters:semaster[]=[];

  constructor(private insert: FormBuilder, private http: HttpClient, private authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = JSON.parse(user);
    });
    if (this.currentUser.RoleId == '1') {
      this.isAdmin = true;
    }
    if (this.currentUser.RoleId == '2') {
      this.isManager = true;
    }
    if (this.currentUser.RoleId == '3') {
      this.isMember = true;
    }
  }


  validateForm() {
    if (this.form.invalid) {
      this.form.get('TestTime').markAsTouched();
      this.form.get('TotalTest').markAsTouched();
      this.form.get('ExamId').markAsTouched();
      this.form.get('SemasterExamId').markAsTouched();
      this.form.get('TestName').markAsTouched();
      this.form.get('CreateBy').markAsTouched();
      this.form.get('PassScore').markAsTouched();
      this.form.get('Status').markAsTouched();
      return;
    }
    // do something else
}
regTotal="^[0-9]{1,2}$";
regPassScore="^[0-9]{1,3}$"

  ngOnInit() {
    this.nameuser=this.currentUser.FullName;
    this.form = this.insert.group({
      ExamId: ['', [Validators.required]],
      SemasterExamId: ['',[Validators.required]],
      TestName: ['', [Validators.required,Validators.maxLength(50)]],
      
      CreateBy: [this.currentUser],
      
      PassScore: ['', [Validators.required,Validators.pattern]],
      TotalTest: ['', [Validators.required,Validators.pattern]],
      Status: ['', [Validators.required]],
      TestTime: ['', [Validators.required,Validators.pattern]],

    });
    this.http.get<string>('http://localhost:65170/api/exam').subscribe(
      value => {
        this.exams = JSON.parse(value)  ;
        

      });
      this.http.get<string>('http://localhost:65170/api/Semaster').subscribe(
      value => {
        this.semasters = JSON.parse(value)  ;
        

      });
      
  }
  get exam(): FormControl {
    return this.form.get('ExamId') as FormControl;
  }
  get Semaster(): FormControl {
    return this.form.get('SemasterExamId') as FormControl;
  }
  get name(): FormControl {
    return this.form.get('TestName') as FormControl;
  }
  get StartDate(): FormControl {
    return this.form.get('StartDate') as FormControl;
  }
  get EndDate(): FormControl {
    return this.form.get('EndDate') as FormControl;
  }
  get CreateBy(): FormControl {
    return this.form.get('CreateBy') as FormControl;
  }
  
  get PassScore(): FormControl {
    return this.form.get('PassScore') as FormControl;
  }
  get TotalTest(): FormControl {
    return this.form.get('TotalTest') as FormControl;
  }
  get status(): FormControl {
    return this.form.get('Status') as FormControl;
  }
  get TestTime(): FormControl {
    return this.form.get('TestTime') as FormControl;
  }
  onSubmit() {
    

    if (this.form.valid) {
      const value = this.form.value;
      this.http.post('http://localhost:65170/api/Test', JSON.stringify(value),httpOptions).subscribe({
        next: (response) => {
         confirm('success')
        },
        error: (err) => {
          confirm('false')
        }

      });
      console.log(this.form.value);
    }
  }

}
