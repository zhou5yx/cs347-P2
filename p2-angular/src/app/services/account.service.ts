import { IAccount } from '../interfaces/account.type';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {

  currentAccount: IAccount = {username: 'spagett', type: 'ta', courses: []};

  constructor(private http: HttpClient) {}

  getProfileData(personId: number): Observable<{}> {
    return this.http.get('http://localhost:3000/api/user/' + personId)
      .pipe(
        map(res => {
          console.log(res);
          return null;
        })
      );
  }
}
