import { Component, OnInit, ViewChild } from '@angular/core';
import { Test } from '../list-test/list-test.component';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})


export class ListDetailComponent implements OnInit {
 test:Test [] = [];
 displayedColumn: string[] = ['select', 'NameUser', 'NameExam', 'NameCategory', 'TestName',  'SemsesterName'];
 dataSource = new MatTableDataSource<Test>(this.test);
 selection = new SelectionModel<Test>(true, []);
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
  constructor(private ac:ActivatedRoute,
    private http:HttpClient) { }
    private UserId: string;

  ngOnInit() {
    const testID = this.ac.snapshot.paramMap.get('testID');
     this.http.get<string>('http://localhost:65170/api/test/'+testID  ).subscribe
     (
       value =>{
         this.dataSource.data = JSON.parse(value);
         console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
         console.log('value'+value);
         
       }
       
     );
     this.dataSource.sort = this.sort;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  checkboxLabel(row?: Test): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.TestName + 1}`;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


}
