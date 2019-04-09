import { Component, OnInit, Inject } from '@angular/core';
import { ICalendarEvent } from '../../interfaces/calendar-event.type';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IAccount } from '../../interfaces/account.type';
import { AccountService } from '../../services/account.service';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit {
  currentAccount = this.accountService.currentAccount;
  requesterAccount: IAccount = {firstname: '', lastname: '', username: '',
                                role_id: 0, id: 0 };

  constructor(
  public dialogRef: MatDialogRef<EventDialogComponent>,
  private accountService: AccountService,
  private calendarService: CalendarService,
  @Inject(MAT_DIALOG_DATA) public data) { }


  ngOnInit() {
    this.accountService.getProfileData(this.data.event.requester)
      .subscribe((account: IAccount) => {
          this.requesterAccount = account;
        });
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
      this.data.event.requester = this.data.person.id;
    }
    else if(this.data.event.type === 'cover')
    {
      this.data.event.type = 'Pending';
      this.data.event.requestee = this.data.person.id;
    }
    this.calendarService.updateEvent(this.data.event).subscribe((result) => {
      console.log(result);
    })
    this.dialogRef.close(this.data.event.type);
  }

  getDay(dateStr: string) {
    return new Date(dateStr).getHours() % 12;
  }
}
