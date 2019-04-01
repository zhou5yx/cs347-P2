import { Component, OnInit,ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';
import {MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatMenuModule} from '@angular/material/menu';

export interface FakeData {
  Requester: string;
  Requestee: string;
  Course: string;
  Shift: string;
  Status: string;
  description: string;
}

const FAKE_DATA: FakeData[] = [
  {
    Requester: 'Ross Woodhams',
    Requestee: 'Raghnall Reynell',
    Course: 'CS 149',
    Shift: 'Wednesday, March 13, 2019 4:00pm-6:00pm',
    Status: 'Approved',
    description: 'This request has been approved'
  }, {
    Requester: 'Shandar Hathaway',
    Requestee: 'Sebastián Perrault',
    Course: 'CS 159',
    Shift: 'Sunday March 16, 2019 1:00pm-3:00pm',
    Status: 'Pending',
    description: 'Request is still waiting for approval'
  }, {
    Requester: 'Ali Tod',
    Requestee: 'Alvis Borislavov',
    Course: 'CS 159',
    Shift: 'Tuesday March 19, 2019, 6:00pm-8:00pm',
    Status: 'Pending',
    description: 'Request is still waiting for approval'
  }
];

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

  displayedColumns: string[] = ['select','Requester', 'Requestee', 'Course', 'Shift','Status'];
  dataSource =   new MatTableDataSource<FakeData>(FAKE_DATA);
  selection = new SelectionModel<FakeData>(true, []);
  expandedElement: FakeData | null;
  SemesterSel = "sp19";


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

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      alert('must be logged in to access this feature');
    }
    this.dataSource.sort = this.sort;


  }

}
