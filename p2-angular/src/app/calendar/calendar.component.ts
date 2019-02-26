import { Component, OnInit } from '@angular/core';
import { ICalendarEvent } from '../interfaces/calendar-event.type';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  weekView: boolean = false;
  events: ICalendarEvent[][];

  constructor() { }

  ngOnInit() {
    this.events = [
      [
        {start: 1, end: 2, type: 'shift'},
        {start: 3, end: 4, type: 'shift'}
      ],
      [
        {start: 1, end: 4, type: 'shift'},
        {start: 7, end: 11, type: 'cover'}
      ],
      [
        {start: 1, end: 2, type: 'cover'},
        {start: 5, end: 8, type: 'shift'}
      ],
      [
        {start: 7, end: 11, type: 'shift'}
      ],
      [
        {start: 5, end: 9, type: 'shift'}
      ],
      [
        {start: 1, end: 2, type: 'cover'},
        {start: 3, end: 4, type: 'cover'}
      ],
    ];
  }

}
