import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { User } from '../user';
import { http } from '../http-header';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  searchString: string;
  PositionApi: [];
  DepartmentApi: [];
  users: User[] = [];
  userId = '';
  user: User;
  getUsers: User;
  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }
  displayedColumn: string[] = ['select', 'UserId', 'UserName', 'FullName', 'Email', 'Department', 'Position', 'Action'];
  dataSource = new MatTableDataSource<User>(this.users);
  selection = new SelectionModel<User>(true, []);

  filterForm: FormGroup;

  get Position(): FormControl {
    return this.filterForm.get('Position') as FormControl;
  }
  get Department(): FormControl {
    return this.filterForm.get('Department') as FormControl;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listuser() {
    this.http.get<string>('http://localhost:65170/api/User',{ headers: http }).subscribe(value => {
      this.dataSource.data = JSON.parse(value).Data;
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });
  }
  Edit(userId: string) {
    this.router.navigate(['/user', 'update', userId]);
  }

  ngOnInit() {
    this.http.get<string>('http://localhost:65170/api/User',{ headers: http }).subscribe(value => {
      this.dataSource.data = JSON.parse(value).Data;
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });
    this.filterForm = this.fb.group({
      Position: [''],
      Department: ['']
    });
    this.http.get<string>('http://localhost:65170/api/User',{ headers: http }).subscribe(value => {
      this.PositionApi = JSON.parse(value).Data;
    });
    this.http.get<string>('http://localhost:65170/api/User',{ headers: http }).subscribe(value => {
      this.DepartmentApi = JSON.parse(value).Data;
    });
  }

  onSearch() {
    this.http.get<string>('http://localhost:65170/api/User?searchString=' + this.searchString,{ headers: http }).subscribe(value => {
      this.dataSource.data = JSON.parse(value).Data;
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
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
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.UserId + 1}`;
  }
  onFilter() {
    const value = this.filterForm.value;
    console.log(value);
    this.http.post<string>('http://localhost:65170/api/User/?action=filter', JSON.stringify(value),
    { headers: http }).subscribe(value => {
        this.dataSource.data = JSON.parse(value).Data;
      });
  }
  detail(id) {
    this.userId = id;
    console.log(this.userId);
    this.http.get<string>('http://localhost:65170/api/User/?userid=' + this.userId,{ headers: http }).subscribe(value => {
      this.getUsers = JSON.parse(value);
      console.log(this.getUsers);
    });
    this.http.get<string>('http://localhost:65170/api/User/' + this.userId,{ headers: http }).subscribe(value => {
      this.user = JSON.parse(value);
      console.log(value);
    });

  }
  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete<string>('http://localhost:65170/api/User/' + id,{ headers: http }).subscribe(res => {
        let result = JSON.parse(res);
        if (result.Success == 1) {
          this.users = this.users.filter(b => b.UserId !== id);         
          confirm('Delete success!');
          this.listuser();
        } else if (result.Success == 0) {
          confirm('Error!This user is in use');
        } else {
          confirm('Delete fail!');
        }
      });
    }
  }

  removeSelectedRows(id: string) {
    if (confirm('Delete selected?')) {
      this.selection.selected.forEach(item => {
        this.http.delete<string>('http://localhost:65170/api/User/' + item.UserId,{ headers: http }).subscribe(res => {
          let result = JSON.parse(res);
          if (result.Success == 1) {
            this.dataSource.data = this.dataSource.data.filter(b => b.UserId !== item.UserId);
            confirm('Delete success!');
            this.listuser();
          } else if (result.Success == 0) {
            confirm('Error!This user is in use');
          } else {
            confirm('Delete fail!');
          }
        }
        );
        // this.dataSource = new MatTableDataSource<User>(this.dataSource.data);
      });
      this.selection = new SelectionModel<User>(true, []);
    }
  }
}



