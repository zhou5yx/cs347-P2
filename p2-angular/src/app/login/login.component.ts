import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: boolean = true;

  constructor (
    private router: Router
  ) {}

  ngOnInit() {
  }

  onSubmit(form) {
    console.log(form.toggle_option);
    if (form.toggle_option === "ta") {
      this.router.navigate(['/profile/1']);
    } else if (form.toggle_option === "student") {
      this.router.navigate(['/profile/2']);
    } else if (form.toggle_option === "admin"){
      this.router.navigate(['/session']);
    }
  }

}
