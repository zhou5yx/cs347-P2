import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../services/account.service';
import { SessionService } from '../services/session.service';
import { IAccount } from '../interfaces/account.type';
import { Question } from '../interfaces/question.type';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-live-session',
  templateUrl: './live-session.component.html',
  animations: [
   trigger('detailExpand', [
     state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
     state('expanded', style({height: '*'})),
     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
   ])
 ],
  styleUrls: ['./live-session.component.css']
})
export class LiveSessionComponent implements OnInit {
  currentAccount: IAccount;
  displayedColumns: string[] = ['Question', 'Name', 'Time', 'Status','Votes'];
  questions: Question[] = [];
  announcements = [];
  dataSource = new MatTableDataSource(this.questions);
  expandedElement: Question | null;
  showsess: boolean = false;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      alert('must be logged in to access this feature');
    }
    this.currentAccount = this.accountService.currentAccount;
    this.dataSource.sort = this.sort;
    this.sessionService.getQuestions()
      .subscribe((res) => {
        res.result.forEach((question) => {
          this.questions.push({
            Question: question.title,
            Name: question.firstname + " " + question.lastname,
            Time: new Date(question.mytimestamp).getTime() + "",
            Status: question.status,
            Votes: question.votes,
            description: question.description,
            Stuanswer: question.student_answer,
            TAanswer: question.ta_answer,
            id: question.id
          });
        });
      });
  }

  submitQuestion(form) {
    if (form.valid) {
      this.sessionService.postNew(form.value, this.accountService.currentAccount.id, true)
        .subscribe((result) => {
          this.questions.push({
            Question: form.value.title,
            Name: this.accountService.currentAccount.firstname + " "
              + this.accountService.currentAccount.lastname,
            Time: new Date().getTime() + "",
            Status: "Unresolved",
            Votes: 0,
            description: form.value.description,
            Stuanswer: "",
            TAanswer: "",
            id: result.insertId
          });
          this.dataSource = new MatTableDataSource(this.questions);
        });
    }
  }

  submitAnnouncement(form) {
    if (form.valid) {
      this.sessionService.postNew(form.value, this.accountService.currentAccount.id, false)
        .subscribe((result) => {
          this.announcements.push({
            Question: form.value.title,
            Name: this.accountService.currentAccount.firstname + " "
              + this.accountService.currentAccount.lastname,
            Time: new Date().getTime() + "",
            Status: "Unresolved",
            Votes: 0,
            description: form.value.description,
            Stuanswer: "",
            TAanswer: "",
            id: result.insertId
          });
          this.dataSource = new MatTableDataSource(this.announcements);
        });
    }
  }

  testM(){
    this.showsess = true;
  }

}
