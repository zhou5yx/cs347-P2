import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class SessionService {

  constructor(private http: HttpClient) {}

  postQuestion(form, id: number) {
    console.log(form);
    const body = JSON.stringify(form);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/api/session/question',
      body, {headers: headers})
      .pipe(
        map((response: Response) => {return response},
        catchError((error: Response) => throwError(error))
      ));
    }
  }

}
