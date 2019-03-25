import { Component, OnInit, Inject } from '@angular/core';
import { ICalendarEvent } from '../../interfaces/calendar-event.type';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IAccount } from '../../interfaces/account.type';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit {

  constructor(
  public dialogRef: MatDialogRef<EventDialogComponent>,
  /**private accountService: AccountService,**/
  @Inject(MAT_DIALOG_DATA) public data) { }


  ngOnInit() {
    console.log(this.data);
  }

  updateType(){
    if(this.data.event.type === 'shift')
    {
      this.data.event.type = 'Pending';
    }
    if(this.data.event.type === 'cover')
    {
      this.data.event.type = 'Pending';
    }
    this.dialogRef.close(this.data.event.type);
  }
}
