import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';

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
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authenticationService.login(this.username.value, this.password.value, this.rememberMe.value)
        .pipe(first())
        .subscribe(
          value => {
            if (value == 'null') {
              this.loading = false;
            } else this.router.navigate(['']);
          });
    }
    console.log(this.loading);
  }

}
