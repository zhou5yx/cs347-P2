import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { AccountService } from '../services/account.service';
import { IAccount } from '../interfaces/account.type';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: number = localStorage.getItem('id') ? parseInt(localStorage.getItem('id')) : 0;
  currentAccount: IAccount;
  displayedAccount: IAccount = {firstname: '', lastname: '', username: '',
                                 id: 0, role_id: 0,type:'', courses:[] };

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      alert('must be logged in to access this feature');
    }
    this.currentAccount = this.accountService.currentAccount;
    this.accountService.getProfileData(this.route.snapshot.params.id)
      .subscribe((account: IAccount) => {
        if (!account) {
          this.router.navigate(['/notfound']);
        } else {
          this.displayedAccount = account;
        }
      });
  }

}
