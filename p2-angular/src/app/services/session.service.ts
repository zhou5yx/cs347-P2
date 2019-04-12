import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class SessionService {

  constructor(private http: HttpClient) {}

  postNew(form, id: number, isQuestion) {
    form.id = id;
    const body = JSON.stringify(form);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = isQuestion ? 'http://localhost:3000/api/session/question'
      : 'http://localhost:3000/api/session/announcement'
    return this.http.post(url + '?token='
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

  getAnnouncements() {
    return this.http.get('http://localhost:3000/api/session/announcement?token='
      + localStorage.getItem('token'))
    .pipe(
      map((response: any) => {return response}),
      catchError((error: Response) => throwError(error))
    );
  }

  updateQuestion(id: number, votes?: number, stuAns?: string, taAns?: string, resolved?: string) {
    let data = {
      votes: votes,
      studentAns: stuAns,
      taAns: taAns,
      resolved: resolved
    }
    const body = JSON.stringify(data);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let url = 'http://localhost:3000/api/session/question/' + id;
    return this.http.put(url + '?token='
      + localStorage.getItem('token'),
      body, {headers: headers})
      .pipe(
        map((response: any) => {return response},
        catchError((error: Response) => throwError(error))
      ));
  }

}
