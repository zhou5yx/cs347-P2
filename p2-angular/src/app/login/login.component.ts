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
      this.accountService.currentAccount.username = form.value.username;
      if (form.value.toggle_option === "ta") {
        this.accountService.currentAccount.type = "ta";
        this.router.navigate(['/profile/1']);
      } else if (form.value.toggle_option === "student") {
        this.accountService.currentAccount.type = "student";
        this.router.navigate(['/profile/2']);
      } else if (form.value.toggle_option === "admin") {
        this.accountService.currentAccount.type = "admin";
        this.router.navigate(['/admin']);
      }
    } else {
      // TODO: figure out form validation for angular
      alert('invalid form');
    }
  }

  registerSubmit(form: NgForm) {
    if (!form.invalid) {
      this.accountService.registerUser(this.form.value).subscribe((result) => {
        console.log(result);
      })
    }
  }

}
