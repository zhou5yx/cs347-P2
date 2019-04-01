import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean = false;
  id: number = localStorage.getItem('id') ? parseInt(localStorage.getItem('id')) : 1;

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.clear();
    this.accountService.token = "";
    this.accountService.currentAccount = null;
  }

}
