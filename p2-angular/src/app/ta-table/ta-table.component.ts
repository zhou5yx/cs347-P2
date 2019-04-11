import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { AccountService } from '../services/account.service';

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

  fakeTA;
  dataSource;
  displayedColumns: string[] = ['select','firstname', 'course_id','username'];
  selection = new SelectionModel(true, []);
  expandedElement: null;


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

  constructor(private accountService:AccountService) {
 }

  ngOnInit() {
    this.accountService.getAllUser().subscribe((result) => {
      this.fakeTA = result;
      this.dataSource =   new MatTableDataSource(this.fakeTA);
      this.dataSource.sort = this.sort;
    });


  }

}
