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
          this.router.navigate(['/profile/' + this.accountService.currentUser.id]);
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
        alert('Account created! Log in with your credentials to access your account');
        this.router.navigate(['/login']);
      });
    }
  }

}
