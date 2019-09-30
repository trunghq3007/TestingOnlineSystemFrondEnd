import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { http } from 'src/app/http-header';
import { MyserviceService } from 'src/app/myservice.service';
export interface User {
  Id: number;
  UserName: string;
  FullName: string;
  Phone: string;
  Email: string;
  Address: string;
  Status: number;
}

@Component({
  selector: 'app-list-user-assignment',
  templateUrl: './list-user-assignment.component.html',
  styleUrls: ['./list-user-assignment.component.scss']
})
export class ListUserAssignmentComponent implements OnInit {

  testAssignment: User[] = [];
  dataSource = new MatTableDataSource<User>(this.testAssignment);
  selection = new SelectionModel<User>(true, []);
  displayedColumn: string[] = ['select', 'UserName', 'FullName', 'Phone', 'Email', 'Address', 'Status', 'Action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private myservice: MyserviceService, private http: HttpClient, private ac: ActivatedRoute, private router: Router) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
    });
  }

  ngOnInit() {
    const testID = this.ac.snapshot.paramMap.get('Id');
    console.log(testID)
    this.http.get<string>('http://localhost:65170/api/TestAssignment/' + testID + '?action=GetAll', { headers: http() }).subscribe(
      value => {
        
        this.dataSource.data = JSON.parse(value);
        this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
        
      },
      err => {
        var errors = err.status + ',' + err.message;
        this.myservice.changeError(errors);
      });
    console.log(this.dataSource)
    this.dataSource.sort = this.sort;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
