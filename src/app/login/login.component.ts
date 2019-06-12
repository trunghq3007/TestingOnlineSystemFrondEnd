import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { ObjectResult } from '../object-result';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
  get rememberMe(): FormControl {
    return this.loginForm.get('rememberMe') as FormControl;
  }
  constructor(private fb: FormBuilder, private http: HttpClient,
    private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) {
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/login']);
    // }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: this.fb.control('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      rememberMe: this.fb.control(false)
    });
  }
  // onSubmit() {
  //   this.submitted = true;
  //   this.loading = true;
  //   console.log(this.loginForm);
  //   if (this.loginForm.invalid) {
  //     return;
  //   } else {
  //     this.authenticationService.login(this.username.value, this.password.value, this.rememberMe.value)
  //       .pipe(first())
  //       .subscribe(
  //         value => {
  //           if (value == 'null') {
  //             this.loading = false;
  //           } else this.router.navigate(['']);
  //         });
  //   }
  //   console.log(this.loading);
  // }
  onSubmit() {
    if (this.loginForm.valid) {
      const value = this.loginForm.value;
      this.http.post<ObjectResult>('http://localhost:65170/api/Login', JSON.stringify(value), httpOptions).subscribe({
        next: (res) => {
          if (res.Success === 1) {
            localStorage.setItem('currentPermission', res.Data);
            const sessionId = localStorage.getItem('currentPermission');
            // debugger;
            const httpOptions1 = {
              headers: new HttpHeaders({ 'Content-Type': 'application/json', 'permission': sessionId  })
            };
            this.http.get<string>('http://localhost:65170/api/group', httpOptions1).subscribe((val) => {
              // debugger;
              console.log(JSON.parse(val));
            });


          } else {
            // check looix
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

  }
}
