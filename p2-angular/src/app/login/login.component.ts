import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form);
  }

}
