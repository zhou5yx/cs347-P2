import { Component, OnInit,ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

export interface FakeTA {
  Name: string;
  Course: string;
  description:string;
}

const FAKE_TA: FakeTA[] = [
  {
    Name: 'Rose Woodhams',
    Course: 'CS 149',
    description: ''
  }, {
    Name: 'Shondra Hathaway',
    Course: 'CS 159',
    description: ''
  }, {
    Name: 'Alice Tod',
    Course: 'CS 159',
    description: ''
  }
];

@Component({
  selector: 'app-ta-table',
  templateUrl: './ta-table.component.html', animations: [
   trigger('detailExpand', [
     state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
     state('expanded', style({height: '*'})),
     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
   ]),
 ],
  styleUrls: ['./ta-table.component.css']
})
export class TaTableComponent implements OnInit {

  displayedColumns: string[] = ['select','Name', 'Course'];
  dataSource =   new MatTableDataSource<FakeTA>(FAKE_TA);
  selection = new SelectionModel<FakeTA>(true, []);
  expandedElement: FakeTA | null;

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

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
