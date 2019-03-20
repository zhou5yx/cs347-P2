import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ICalendarEvent } from '../interfaces/calendar-event.type';
import { IAccount } from '../interfaces/account.type';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() inputMonth?: number;
  @Input() person?: IAccount;
  @Input() course?: number;

  monthNames: string[] = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  monthRows: number[] = [0,1,2,3,4,5];
  monthCols: number[] = [0,1,2,3,4,5,6];
  currentYear: number;
  currentMonth: number;
  events = [];
  calendarInfo: {day: number, month: number, events: ICalendarEvent[]}[][]
    = this.resetInfo();


  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.resetCalendar();
  }

  // reset if person was just loaded
  ngOnChanges(changes: SimpleChanges) {
    if (changes.person) {
      this.resetCalendar();
    }
  }

  // resets calendar based on whether input month was passed in
  resetCalendar() {
    const now = new Date();
    if (!this.inputMonth) {
      this.changeCalendarMonth(now.getFullYear(), now.getMonth());
    } else {
      this.changeCalendarMonth(now.getFullYear(), this.inputMonth);
    }
  }

  changeCalendarMonth(year: number, month: number) {
    if (this.person && this.person.role_id === 1) {
      this.calendarService.getEvents(this.person.id, month).subscribe((events) => {
        this.events = events;
        this.fillEvents(new Date(year, month, 1).getDay(), month, year);
      });
    }
    else if(this.course){
        this.calendarService.getAdminEvents(this.course, month).subscribe((events) => {
          console.log(events);
          this.events = events;
          this.fillEvents(new Date(year,month,1).getDay(),month,year);
        });
    }
    // get the number of days this month
    const numDays = new Date(year, month+1, 0).getDate();
    // get number of days last month
    let prevNumDays = new Date(year, month, 0).getDate();
    // update displayed variables
    this.currentYear = year;
    this.currentMonth = month;
    // zero out days array
    this.resetInfo();
    // get day of week of the first day of this month
    let calDay = new Date(year, month, 1).getDay();
    // fill in calendar with this months days
    let nextMonthDay = 1;
    for (let currMonthDay = 1; calDay < this.monthRows.length * this.monthCols.length; currMonthDay++, calDay++) {
      if (currMonthDay <= numDays) {
        this.calendarInfo[Math.floor(calDay / 7)][calDay % 7].day = currMonthDay;
        this.calendarInfo[Math.floor(calDay / 7)][calDay % 7].month = this.currentMonth;
      } else { // fill in the overflow of next month's days
        this.calendarInfo[Math.floor(calDay / 7)][calDay % 7].day = nextMonthDay;
        this.calendarInfo[Math.floor(calDay / 7)][calDay % 7].month = (this.currentMonth + 1) % 12;
        nextMonthDay++;
      }
    }
    // fill in the beginning of calendar with last month's days
    for (let i = new Date(year, month, 1).getDay() - 1; i >= 0; i--, prevNumDays--) {
      this.calendarInfo[0][i].day = prevNumDays;
      this.calendarInfo[0][i].month = (this.currentMonth + 11) % 12;
    }
  }

  resetInfo() {
    let reset = [[],[],[],[],[],[]];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        reset[i][j] = {day: 0, month: 0, events: []};
      }
    }
    return reset;
  }

  fillEvents(calDay: number, month: number, year: number) {
    for (let i = 1; i <= new Date(year, month+1, 0).getDate(); i++, calDay++) {
      let dayEvents = [];
      if (this.events.length > 0) {
        this.events.forEach((event) => {
          var date = new Date(event.start_date);
          if (date.getDate() === i) dayEvents.push(event);
        });
      }
      this.calendarInfo[Math.floor(calDay / 7)][calDay % 7].events = dayEvents;
    }
  }

}
