import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../services/account.service';
import { IAccount } from '../interfaces/account.type';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort, MatTableDataSource} from '@angular/material';

export interface LiveData {
  Question: string;
  Name: string;
  Time:string;
  Status: string;
  Votes: number;
  description:string;
  Stuanswer: string;
  TAanswer: string;
}

const LIVE_DATA: LiveData[] = [
 {
    Question: 'How do I fix this bug?',
    Name: 'Jeremiah Tinklewinkers',
    Time: '5:00pm',
    Status:'Unresolved',
    Votes: 3,
    description: 'There is a bug, a very bad bug, and it is under my rug. Can you please help me? I don\'t know what to do!',
    Stuanswer: '',
    TAanswer:''
 },
 {
    Question: 'How do I write a Java Swing GUI?',
    Name: 'Harold C. Jaboobalop',
    Time: '6:00pm',
    Status:'Resolved',
    Votes: 4,
    description: 'I don\'t know what I\'m suppose to do! Everything is so confusing :(',
    Stuanswer: 'You have to start by writing panels. Then after that you have to do a layout. Then you should add buttons. Then you should make some events like click and stuff. Good luck!',
    TAanswer: ''
 },
 {
    Question:'My eclipse keeps crashing?',
    Name: 'Helga Welga',
    Time: '7:00pm',
    Status: 'Resolved',
    Votes: 10,
    description: 'I tried to open by 149 lab in eclipse but it crashed and now my screen is displaying a laughing skull and crossbones. What gives?',
    TAanswer: 'This is actually a common problem in eclipse and they are working on a fix now. If you get up and do 3 spins then sit back down you should be good!',
    Stuanswer: ''
   }
];

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
  dataSource =   new MatTableDataSource(LIVE_DATA);
  expandedElement: LiveData | null;
  showsess: boolean = false;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      alert('must be logged in to access this feature');
    }
    this.currentAccount = this.accountService.currentUser;
    this.dataSource.sort = this.sort;
  }

  testM(){
    this.showsess = true;
  }
}
