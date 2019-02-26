import { Component, OnInit, Input } from '@angular/core';
import { ICalendarEvent } from '../../interfaces/calendar-event.type';
@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css']
})
export class CalendarDayComponent implements OnInit {

  @Input() day: number;
  @Input() events?: ICalendarEvent[];
  constructor() { }

  ngOnInit() {
  }

}
