import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: Observable<User>;
  public gotoLogin: boolean;
  private currentUserSubject: BehaviorSubject<User>;
  private AppUser: Subject<User> = new Subject<User>();
  // public user:User;
  public LoginStatus$: Observable<User> = this.AppUser.asObservable();

  constructor(private http: HttpClient,
              private router: Router) {
    //this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.gotoLogin = false;

  }

  public get user(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  login(username: string, password: string, rememberme: boolean) {
    return this.http.post<any>('http://localhost:65170/api/User?userName=' + username +
      '&passWord=' + password + '&rememberMe=' + rememberme, httpOptions)
      .pipe(map(user => {
        if (user != 'null') {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.AppUser.next(user);
          //this.user = user;
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out\
    localStorage.removeItem('currentUser');
    this.AppUser.next(null);
    // this.user = null;
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('login');
  }

}
