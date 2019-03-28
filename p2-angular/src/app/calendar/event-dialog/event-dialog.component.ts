import { Component, OnInit, Inject } from '@angular/core';
import { ICalendarEvent } from '../../interfaces/calendar-event.type';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IAccount } from '../../interfaces/account.type';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit {

  constructor(
  public dialogRef: MatDialogRef<EventDialogComponent>,
  private accountService: AccountService,
  @Inject(MAT_DIALOG_DATA) public data) { }


  ngOnInit() {
    console.log(this.data);
  }

  updateType(){
    //console.log(this.data.event.type);
    if(this.data.event.type === 'shift')
    {
      /**Note: this is for testing pending: this.data.person.id = 7;**/
      if(this.accountService.currentAccount.id === this.data.person.id)
      {
        this.data.event.type = 'Pending';
      }
      else
      {
        this.data.event.type = 'cover';
      }
    }
    else if(this.data.event.type === 'cover')
    {
      this.data.event.type = 'Pending';
    }
    this.dialogRef.close(this.data.event.type);
  }
}
