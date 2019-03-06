import { Component, OnInit, Inject } from '@angular/core';
import { ICalendarEvent } from '../../interfaces/calendar-event.type';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EventDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data) { }


  ngOnInit() {
    
  }

}
