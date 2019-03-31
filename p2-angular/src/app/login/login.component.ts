import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IAccount } from '../interfaces/account.type';
import { AccountService } from '../services/account.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: boolean = true;

  constructor (
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {
  }

  onSubmit(form) {
    if (form.valid) {
      this.accountService.loginUser(form.value).subscribe((result) => {
        if (result) {
          // update the token in the user account
          console.log(this.accountService.token);
          console.log(this.accountService.currentUser);
        }
      }, (err) => {
        console.log(err);
        alert(err.error.message);
      });
    }
  }

  registerSubmit(form: NgForm) {
    if (!form.invalid) {
      this.accountService.registerUser(form.value).subscribe((result) => {
        console.log(result);
      });
    }
  }

}
