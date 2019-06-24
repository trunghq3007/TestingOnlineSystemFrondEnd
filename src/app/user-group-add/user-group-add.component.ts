import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UserGroupAdd } from '../user-group-add';
import { MyserviceService } from '../myservice.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-user-group-add',
  templateUrl: './user-group-add.component.html',
  styleUrls: ['./user-group-add.component.scss']
})
export class UserGroupAddComponent implements OnInit {
  addusergroups: UserGroupAdd[] = [];
  constructor(private myservice:MyserviceService ,private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }
  displayedColumn: string[] = ['select', 'UserId', 'UserName', 'FullName'];
  dataSource = new MatTableDataSource<UserGroupAdd>(this.addusergroups);
  selection = new SelectionModel<UserGroupAdd>(true, []);
  userId = '';


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    const UserGroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
    console.log(UserGroupId);
    this.http.get<string>('http://localhost:65170/api/UserGroup/?idgroup=' + UserGroupId).subscribe(value => {
      this.dataSource.data = JSON.parse(value).Data;
      console.log(this.addusergroups);
      this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: UserGroupAdd): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.FullName + 1}`;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  AddSelectedRows() {
    this.selection.selected.forEach(item => {
      const UserGroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
      this.userId = this.activatedRoute.snapshot.paramMap.get('UserId');
      console.log(item.UserId);
      console.log(UserGroupId);
      //  this.dataSource.data.splice(index,1);
      this.http.post<string>('http://localhost:65170/api/UserGroup/?idgroup= ' + UserGroupId
        + '&iduser=' + item.UserId, httpOptions).subscribe(
          value => {
            this.dataSource.data = JSON.parse(value).Data;

            this.http.get<string>('http://localhost:65170/api/UserGroup/?idgroup=' + UserGroupId).subscribe(value => {
              this.dataSource.data = JSON.parse(value).Data;
              console.log(this.addusergroups);
            });
          }
        );
      this.dataSource = new MatTableDataSource<UserGroupAdd>(this.dataSource.data);
    });
    this.selection = new SelectionModel<UserGroupAdd>(true, []);
  }
  clickToRoute() {
    const UserGroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
    this.router.navigate(['group/usergroup/' + UserGroupId]);
  }

}
