import { IAccount } from '../interfaces/account.type';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';

@Injectable()
export class AccountService {

  token: string = localStorage.getItem('token') ? localStorage.getItem('token') : "";

  currentAccount: IAccount = {
    firstname: localStorage.getItem('firstname'),
    lastname: localStorage.getItem('lastname'),
    username: localStorage.getItem('username'),
    id: parseInt(localStorage.getItem('id')),
    role_id: parseInt(localStorage.getItem('role')),
    course: parseInt(localStorage.getItem('course'))
  };
  private subject = new Subject<any>();

  constructor(private http: HttpClient) {}

  getProfileData(personId: number): Observable<IAccount> {
    return this.http.get('http://localhost:3000/api/user/' + personId
      + '?token=' + localStorage.getItem('token'))
      .pipe(
        map(res => {
          return res[0];
        })
      );
  }

  getAllUser(){
    return this.http.get('http://localhost:3000/api/user/'
      + '?token=' + localStorage.getItem('token'))
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  getHoursForMonth(month: string){
    return this.http.get('http://localhost:3000/api/mon/'+ month
      + '?token=' + localStorage.getItem('token'))
      .pipe(
        map(res=> {
          return res;
        })
      )
  }

  getRole(role_id: number){
    return this.http.get('http://localhost:3000/api/role/'+role_id + '?token=' + localStorage.getItem('token'))
    .pipe(
      map(res => {

        return res[0];
      })
    );
  }

  registerUser(form) {
    const body = JSON.stringify(form);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/api/user/',
      body, {headers: headers})
      .pipe(
        map((response: Response) => {return response},
        catchError((error: Response) => throwError(error))
      ));
  }

  loginUser(form) {
    const body = JSON.stringify(form);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/api/user/login',
      body, {headers: headers})
      .pipe(
        map((response: {token: string, user: {firstname: string, lastname: string,
          id: string, roleId: string, courseId: string, username: string}}) => {
          console.log(response);
          localStorage.setItem('firstname', response.user.firstname);
          localStorage.setItem('lastname', response.user.lastname);
          localStorage.setItem('id', response.user.id);
          localStorage.setItem('role', response.user.roleId);
          localStorage.setItem('course', response.user.courseId);
          localStorage.setItem('username', response.user.username);
          localStorage.setItem('token', response.token);
          this.setGlobalValues();
          return response;
        },
        catchError((error: Response) => throwError(error))
      ));
  }

  setGlobalValues() {
    this.currentAccount.firstname = localStorage.getItem('firstname');
    this.currentAccount.lastname = localStorage.getItem('lastname');
    this.currentAccount.username = localStorage.getItem('username');
    this.currentAccount.id = parseInt(localStorage.getItem('id'));
    this.currentAccount.role_id = parseInt(localStorage.getItem('role'));
    this.currentAccount.course = parseInt(localStorage.getItem('course'));
    this.token = localStorage.getItem('token');
    this.setLoginObservableValue(true);
  }

  resetCurrentAccount() {
    this.currentAccount = {firstname: 'name', lastname: 'name',
                            username: 'spagett', id: 7, role_id: 2, type: 'ta',
                            course: 149};
  }

  isLoggedIn() {
    this.token = localStorage.getItem('token') ? localStorage.getItem('token') : "";
    return this.token.length > 0;
  }

  getLoginObservable() {
    return this.subject.asObservable();
  }

  setLoginObservableValue(loggedIn: boolean) {
    this.subject.next({isLoggedIn: loggedIn});
  }

  generateSchedule() {
    console.log('generate');
    const body = JSON.stringify({});
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/api/user/schedule?'
      + 'token=' + localStorage.getItem('token')),
      body, {headers: headers})
      .pipe(
        map((response: Response) => {return response},
        catchError((error: Response) => throwError(error))
      ));
  }

}
