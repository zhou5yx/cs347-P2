import { Injectable } from '@angular/core';
import { ICalendarEvent } from '../interfaces/calendar-event.type';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class CalendarService {

  constructor(private http: HttpClient) {}

  getEvents(personId: number, month: number): Observable<ICalendarEvent[][][]> {
    return this.http.get<{events: ICalendarEvent[][][]}>('http://localhost:3000/api/calendar-events/' + personId + '?month=' + month)
      .pipe(
        map(res => {
          return res.events;
        })
      );
  }
}