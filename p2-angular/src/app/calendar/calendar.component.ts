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
    const numDays = new Date(year, month+1, 0).getDate();
    this.currentYear = year;
    this.currentMonth = month;
    const firstDay = new Date(year, month, 1).getDay();
    for (let i = 0; i < numDays; i++, firstDay++) {
      this.days[Math.floor(firstDay / 7)][firstDay % 7] = i + 1;
    }
    console.log(this.events);
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
