import { IAccount } from '../interfaces/account.type';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AccountService {

  token: string;

  currentAccount: IAccount = {firstname: 'name', lastname: 'name',
                              username: 'spagett', id: 7, role_id: 2, type: 'ta',
                              course: 149};

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
        map((response) => {
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
  }

}
