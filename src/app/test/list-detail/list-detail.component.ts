import { Component, OnInit, ViewChild } from '@angular/core';
import { Test } from '../list-test/list-test.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { http } from 'src/app/http-header';
import { MyserviceService } from 'src/app/myservice.service';
import { User } from 'src/app/user';

export interface Users {
  dep: number;
  sum: string;
  user: User;
}


@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})


export class ListDetailComponent implements OnInit {
  test: Users[] = [];
  testID = this.ac.snapshot.paramMap.get('testID');
  displayedColumn: string[] = ['select', 'user.UserName', 'TotalTest', 'Score', 'Action'];
  dataSource = new MatTableDataSource<Users>(this.test);
  selection = new SelectionModel<Users>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private myservice: MyserviceService, private router: Router, private ac: ActivatedRoute, private http: HttpClient) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
    });
  }
  // Users: string;
  // LisUser;
  // UserId: string;
  // UserName: string;
  // testName: string;
  ngOnInit() {
    //  this.testName=this.ac.snapshot.paramMap.get('TestName');
    //   console.log(this.testName);
   
    //   const userid=1;
      // if (sessionStorage.getItem('user')) {
      //   this.Users = sessionStorage.getItem('user');
      //   this.LisUser = this.Users.split(',');
      //   this.UserName = this.LisUser[1];
      //   this.UserId = this.LisUser[0];
      // } else {
      //   this.Users = null;
      // } 
    this.http.get<string>('http://localhost:65170/api/test/' + this.testID + '?action=detail', { headers: http() }).subscribe
      (
        value => {
          this.dataSource.data = JSON.parse(value);
          console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
          console.log('value' + value);
        }
        , err => {
         
          var errors = err.status + ',' + err.message;
          this.myservice.changeError(errors);
        }
      );

    this.dataSource.sort = this.sort;
  }
  testAssignt(testTimeNo){
 this.router.navigate(['/MarkExam',this.testID,testTimeNo]);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  checkboxLabel(row?: Users): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.dep + 1}`;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


}
