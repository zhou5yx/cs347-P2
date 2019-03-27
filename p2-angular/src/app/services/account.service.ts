import { IAccount } from '../interfaces/account.type';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AccountService {

  currentAccount: IAccount = {firstname: 'name', lastname: 'name',
                              username: 'spagett', id: 7, role_id: 2, type: 'ta',
                              courses: []};

  constructor(private http: HttpClient) {}

  getProfileData(personId: number): Observable<IAccount> {
    return this.http.get('http://localhost:3000/api/user/' + personId)
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
    return this.http.post('http://localhost:3000/api/user/', body, {headers: headers})
      .pipe(
        map((response: Response) => {return response},
        catchError((error: Response) => throwError(error))
      ));
  }

}
