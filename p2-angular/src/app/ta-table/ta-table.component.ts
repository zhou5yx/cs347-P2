import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { AccountService } from '../services/account.service';

const FAKE_TA: FakeTA[];
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


  dataSource;
  displayedColumns: string[] = ['select','Name', 'Course','Email'];
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

  constructor(private accountService:AccountService) {
 }

  ngOnInit() {
    this.accountService.getAllUser().subscribe((result) => {
      FAKE_TA = result;
      this.dataSource =   new MatTableDataSource<FakeTA>(FAKE_TA);
      this.dataSource.sort = this.sort;
    });


  }

}
