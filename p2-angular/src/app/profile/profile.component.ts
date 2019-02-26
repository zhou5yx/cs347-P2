import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { AccountService } from '../services/account.service';
import { IAccount } from '../interfaces/account.type';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: number = 0;
  currentAccount: IAccount;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.currentAccount = this.accountService.currentAccount;
  }

}
