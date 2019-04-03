import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class SessionService {

  constructor(private http: HttpClient) {}

  postQuestion(form, id: number) {
    form.id = id;
    const body = JSON.stringify(form);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/api/session/question?token='
      + localStorage.getItem('token'),
      body, {headers: headers})
      .pipe(
        map((response: any) => {return response},
        catchError((error: Response) => throwError(error))
      ));
  }

  getQuestions() {
    return this.http.get('http://localhost:3000/api/session/question?token='
      + localStorage.getItem('token'))
    .pipe(
      map((response: any) => {return response}),
      catchError((error: Response) => throwError(error))
    );
  }

}
