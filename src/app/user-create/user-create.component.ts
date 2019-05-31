import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { User } from '../user';
import { ResultObject } from '../result-object';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  user: User[] = [];
  public Editor = ClassicEditorBuild;
  createForm: FormGroup;
  RolesFormApi: [];

  get UserName(): FormControl {
    return this.createForm.get('UserName') as FormControl;
  }
  get Password(): FormControl {
    return this.createForm.get('Password') as FormControl;
  }
  get Roles(): FormGroup {
    return this.createForm.get('Roles') as FormGroup;
  }
  get RoleId(): FormControl {
    return this.createForm.get('RoleId') as FormControl;
  }
  get CreatedDate(): FormControl {
    return this.createForm.get('CreatedDate') as FormControl;
  }
  get EditedDate(): FormControl {
    return this.createForm.get('EditedDate') as FormControl;
  }
  get FullName(): FormControl {
    return this.createForm.get('FullName') as FormControl;
  }
  get Phone(): FormControl {
    return this.createForm.get('Phone') as FormControl;
  }
  get Email(): FormControl {
    return this.createForm.get('Email') as FormControl;
  }
  get Address(): FormControl {
    return this.createForm.get('Address') as FormControl;
  }
  get Department(): FormControl {
    return this.createForm.get('Department') as FormControl;
  }
  get Position(): FormControl {
    return this.createForm.get('Position') as FormControl;
  }
  get Avatar(): FormControl {
    return this.createForm.get('Avatar') as FormControl;
  }
  get Status(): FormControl {
    return this.createForm.get('Status') as FormControl;
  }
  get Note(): FormControl {
    return this.createForm.get('Note') as FormControl;
  }
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  getApiRoles() {
    this.http.get<string>('http://localhost:65170/api/role/').subscribe(value => {
      this.RolesFormApi = JSON.parse(value);
    });
  }
  phonenumber = "^[0-9]{1,12}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  ngOnInit() {
    this.getApiRoles();
    this.createForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      Email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      Phone: ['', [Validators.required,Validators.pattern(this.phonenumber)]],
      Password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      FullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      Address: ['', [Validators.required]],
      Department: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      Position: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      Roles: this.fb.group({
        RoleId: [''],
      }),
      Status: [''],
      Avatar: [''],
      CreatedDate: [''],
      EditedDate: [''],
      Note: ['']
    });
  }

  onSubmit() {
    console.log(this.createForm.value);
    if (this.createForm.valid) {
      const value = this.createForm.value;
      value.Roles = this.RolesFormApi.filter(s => s.RoleId == value.Roles.RoleId);
      value.Role = value.Roles.length > 0 ? value.Roles[0] : null;
      value.RoleId = value.Role.RoleId;
      console.log(value);
      this.http.post<string>('http://localhost:65170/api/user', JSON.stringify(value), httpOptions).subscribe({
        next: (res) => {
          const result: ResultObject = JSON.parse(res);
          if (result.Success >= 1) {
            confirm('Create success!');
          } else {
            confirm('Create Fail!');
          }
          this.createForm.reset();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }


  validateForm() {
    if (this.createForm.invalid) {
      this.createForm.get('UserName').markAsTouched();
      this.createForm.get('FullName').markAsTouched();
      this.createForm.get('Email').markAsTouched();
      this.createForm.get('Address').markAsTouched();
      this.createForm.get('Department').markAsTouched();
      this.createForm.get('Position').markAsTouched();
      this.createForm.get('Phone').markAsTouched();
      this.createForm.get('Password').markAsTouched();
      this.createForm.get('RoleId').markAsTouched();
      return;
    }
  }

}
