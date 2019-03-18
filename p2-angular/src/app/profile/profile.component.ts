import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { AccountService } from '../services/account.service';
import { IAccount } from '../interfaces/account.type';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: number = 0;
  currentAccount: IAccount;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentAccount = this.accountService.currentAccount;
    this.accountService.getProfileData(this.route.snapshot.params.id).subscribe();
  }

}
