import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { IAccount } from '../interfaces/account.type';

@Component({
  selector: 'app-live-session',
  templateUrl: './live-session.component.html',
  styleUrls: ['./live-session.component.css']
})
export class LiveSessionComponent implements OnInit {
  currentAccount: IAccount;
  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.currentAccount = this.accountService.currentAccount;
  }

}
