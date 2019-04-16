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
    
  }
  openDialog(event: ICalendarEvent) {
    console.log(this.events);
    const dialogRef = this.dialog.open(EventDialogComponent, {
          width: '300px',
          data: {event: event, person: this.person}
        });

    // dialogRef.afterClosed().subscribe(result => {
    //
    //  });
  }

  getDay(dateStr: string) {
    return new Date(dateStr).getHours() % 12;
  }

}
