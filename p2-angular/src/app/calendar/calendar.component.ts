import { Component, OnInit } from '@angular/core';
import { ICalendarEvent } from '../interfaces/calendar-event.type';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  monthNames: string[] = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  monthRows: number[] = [0,1,2,3,4,5];
  monthCols: number[] = [0,1,2,3,4,5,6];
  weekView: boolean = false;
  events: ICalendarEvent[][][];
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

  constructor() { }

  ngOnInit() {
    this.events = this.getEvents();
    const now = new Date();
    this.changeCalendarMonth(now.getFullYear(), now.getMonth());
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

  getEvents(): ICalendarEvent[][][] {
    return [
      [[],[],[],[],[],[],[]],
      [
        [],
        [
          {start: 1, end: 2, type: 'shift'},
          {start: 3, end: 4, type: 'shift'}
        ],
        [],[],
        [
          {start: 1, end: 4, type: 'shift'},
          {start: 7, end: 11, type: 'cover'}
        ],
        [],[]
      ],
      [
        [],[],[],[],[],[],
        [
          {start: 1, end: 2, type: 'cover'},
          {start: 5, end: 8, type: 'shift'}
        ],
      ],
      [
        [],[],[],[],[],
        [
          {start: 7, end: 11, type: 'shift'}
        ],
        [],
      ],
      [
        [],[],[],[],
        [
          {start: 5, end: 9, type: 'shift'}
        ],
        [],[]
      ],
      [
        [
          {start: 1, end: 2, type: 'cover'},
          {start: 3, end: 4, type: 'cover'}
        ],
        [],[],[],[],[],[]
      ]
    ];
  }

}
