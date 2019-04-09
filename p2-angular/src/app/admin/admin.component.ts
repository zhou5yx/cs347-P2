import { Component, OnInit,ViewChild, OnChanges } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';
import {MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatMenuModule} from '@angular/material/menu';
import { IAccount } from '../interfaces/account.type';
import { AccountService } from '../services/account.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from '../services/calendar.service';


@Component({
  selector: 'app-admin',
  styleUrls: ['./admin.component.css'],
  templateUrl: './admin.component.html',
  animations: [
   trigger('detailExpand', [
     state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
     state('expanded', style({height: '*'})),
     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
   ])
 ],
})
export class AdminComponent implements OnInit {
  dataSource;
  FakeData;
  displayedColumns: string[] = ['select','Requester', 'Requestee', 'Course', 'Shift','Status'];
  selection = new SelectionModel(true, []);
  expandedElement: null;
  SemesterSel = "sp19";
  selectedMon = '';
  Mhr;

  isAllSelected() {
   const numSelected = this.selection.selected.length;
   const numRows = this.dataSource.data.length;
   return numSelected === numRows;
 }

 /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
   this.isAllSelected() ?
       this.selection.clear() :
       this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }


  removeSelectedRows(buttonClicked) {

    if(buttonClicked === 'A'){
      this.selection.selected.forEach(item => {
        let t = this.FakeData.find(d => d === item);
        t.type = 'shift';
        t.requester = t.requestee;
        t.user_id = t.requestee;
        t.requestee = 'NULL';
        this.calendarService.updateEvent(t).subscribe((result) => {
        });
      });
    }
    if(buttonClicked === 'D')
    {
      this.selection.selected.forEach(item => {
        let t = this.FakeData.find(d => d === item);
        t.type = 'shift';
        t.requestee = 'NULL';
        this.calendarService.updateEvent(t).subscribe((result) => {
        });
      });
    }

    this.selection.selected.forEach(item => {
      let index: number = this.FakeData.findIndex(d => d === item);
      this.FakeData.splice(index,1)
      this.dataSource = new MatTableDataSource<Element>(this.FakeData);
    });
    this.selection = new SelectionModel<Element>(true, []);
  }

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService:AccountService,
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      alert('must be logged in to access this feature');
    }

    this.calendarService.getPending().subscribe((result) => {
      this.FakeData = result;
      this.dataSource =   new MatTableDataSource(this.FakeData);
      this.dataSource.sort = this.sort;

    });



  }

  getDay(dateStr: string) {
    return new Date(dateStr).getHours() % 12;
  }

  getEventDate(dateStr: string){
    var d = new Date(dateStr);
    return d.getMonth()+1 + '/' + d.getDate() +'/'+d.getFullYear();
  }

  OnSelect(value){
    this.selectedMon = value;
    this.accountService.getHoursForMonth(value).subscribe(
      (result) => {
        this.Mhr = result;
      }
    )
  }

  ngOnChanges(){
  }

    }
