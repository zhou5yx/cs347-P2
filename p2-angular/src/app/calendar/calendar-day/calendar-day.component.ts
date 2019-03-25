import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ICalendarEvent } from '../../interfaces/calendar-event.type';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import { IAccount } from '../../interfaces/account.type';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css']
})
export class CalendarDayComponent implements OnInit {

  @Input() day: number;
  @Input() events?: ICalendarEvent[] = [];
  @Input() person?: IAccount;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  ngOnChanges()
  {
    if(this.person && this.person.role_id === 2)
    {
      this.events = [{course_id: 159,
        end_date: new Date(2019,3,7,23,0,0,0),
        id: 9,
        location: 250,
        start_date: new Date(2019,3,6,16,0,0,0),
        type: "shift",
        user_id: 1 }];
    }
  }
  openDialog(event: ICalendarEvent) {
    console.log(this.events);
    const dialogRef = this.dialog.open(EventDialogComponent, {
          width: '250px',
          data: {event: event, person: this.person}
        });

    dialogRef.afterClosed().subscribe(result => {
          if(result == 'Pending')
          {
            document.getElementById('test-style').setAttribute("style", "color:blue; border-color: blue;");
          }
     });
  }

  getDay(dateStr: string) {
    return new Date(dateStr).getHours() % 12;
  }

}
