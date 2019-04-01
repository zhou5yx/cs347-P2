import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { AccountService } from './services/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean = false;
  id: number = localStorage.getItem('id') ? parseInt(localStorage.getItem('id')) : 1;
  subscription: Subscription;

  ngOnInit() {
    setTimeout(() => {
      this.accountService.setLoginObservableValue(localStorage.getItem('token') != null);
    }, 100);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(
    private accountService: AccountService
  ) {
    this.subscription = this.accountService.getLoginObservable()
      .subscribe(loginInfo => {
        this.isLoggedIn = loginInfo.isLoggedIn;
      });
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.accountService.token = "";
    this.accountService.resetCurrentAccount();
    this.accountService.setLoginObservableValue(false);
  }

}
