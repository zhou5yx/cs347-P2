import { Component, OnInit, Input } from '@angular/core';
import { ICalendarEvent } from '../../interfaces/calendar-event.type';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css']
})
export class CalendarDayComponent implements OnInit {

  @Input() day: number;
  @Input() events?: ICalendarEvent[] = [];
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
      
  }

  openDialog(event: ICalendarEvent) {
    console.log(this.events);
    const dialogRef = this.dialog.open(EventDialogComponent, {
          width: '250px',
          data: {event: event}
        });

    // dialogRef.afterClosed().subscribe(result => {
    //
    // });
  }

  getDay(dateStr: string) {
    return new Date(dateStr).getHours() % 12;
  }

}
