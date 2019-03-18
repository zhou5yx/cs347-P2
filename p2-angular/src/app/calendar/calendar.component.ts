import { Component, OnInit, Input } from '@angular/core';
import { ICalendarEvent } from '../interfaces/calendar-event.type';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() inputMonth?: number;
  monthNames: string[] = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  monthRows: number[] = [0,1,2,3,4,5];
  monthCols: number[] = [0,1,2,3,4,5,6];
  events: ICalendarEvent[][][] = [];
  currentYear: number;
  currentMonth: number;
  days: number[][] = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ]


  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.calendarService.getEvents(1, 1).subscribe((events) => {
      this.events = events;
    });
    const now = new Date();
    if (!this.inputMonth) {
      this.changeCalendarMonth(now.getFullYear(), now.getMonth());
    } else {
      this.changeCalendarMonth(now.getFullYear(), this.inputMonth);
    }
  }

  changeCalendarMonth(year: number, month: number) {
    // get the number of days this month
    const numDays = new Date(year, month+1, 0).getDate();
    // get number of days last month
    let prevNumDays = new Date(year, month, 0).getDate();
    // update displayed variables
    this.currentYear = year;
    this.currentMonth = month;
    // zero out days array
    this.resetDays();
    // get day of week of the first day of this month
    let calDay = new Date(year, month, 1).getDay();
    // fill in calendar with this months days
    let nextMonthDay = 1;
    for (let currMonthDay = 1; calDay < this.monthRows.length * this.monthCols.length; currMonthDay++, calDay++) {
      if (currMonthDay <= numDays)
        this.days[Math.floor(calDay / 7)][calDay % 7] = currMonthDay;
      else {
        this.days[Math.floor(calDay / 7)][calDay % 7] = nextMonthDay;
        nextMonthDay++;
      }
    }
    // fill in the beginning of calendar with last month's days
    for (let i = new Date(year, month, 1).getDay() - 1; i >= 0; i--, prevNumDays--) {
      this.days[0][i] = prevNumDays;
    }
  }

  resetDays() {
    this.days = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
  }

}
