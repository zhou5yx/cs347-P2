import { Injectable } from '@angular/core';
import { ICalendarEvent } from '../interfaces/calendar-event.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class CalendarService {

  constructor(private http: HttpClient) {}

  getEvents(personId: number, month: number): Observable<ICalendarEvent[][][]> {
    return this.http.get<{result: ICalendarEvent[][][]}>('http://localhost:3000/api/calendar/'
      + personId + '?month=' + month + '&token=' + localStorage.getItem('token'))
      .pipe(
        map(res => {
          return res.result;
        })
      );
  }

  getCourseEvents(course: number, month: number): Observable<ICalendarEvent[][][]> {
    return this.http.get<{result: ICalendarEvent[][][]}>('http://localhost:3000/api/calendar/'
      + '?course='+ course + '&month=' +month + '&token=' + localStorage.getItem('token'))
      .pipe(
        map(res=> {
          return res.result;
        })
      );
  }

  getPending(){
    return this.http.get('http://localhost:3000/api/calendar/pending' +  '?token=' + localStorage.getItem('token'))
      .pipe(
        map((res: any) => {
          return res.result;
        })
      );
  }

  updateEvent(event) {
    const body = JSON.stringify(event);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put('http://localhost:3000/api/calendar/?token='
      + localStorage.getItem('token'), body, {headers: headers})
      .pipe(
        map((response: Response) => {return response},
        catchError((error: Response) => throwError(error))
      ));
  }

  UpdateHours(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put('http://localhost:3000/api/calendar/hr/?token='
      + localStorage.getItem('token'), {headers: headers})
      .pipe(
        map((response: Response) => {return response},
        catchError((error: Response) => throwError(error))
      ));

  }

}
