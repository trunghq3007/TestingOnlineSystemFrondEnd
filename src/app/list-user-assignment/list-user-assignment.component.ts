import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { http } from 'src/app/http-header';
import { MyserviceService } from 'src/app/myservice.service';
import { ToastrService } from 'ngx-toastr';

export interface User {
  UserId: number;
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
  Id = this.ac.snapshot.paramMap.get('Id');
  displayedColumn: string[] = ['select', 'UserId', 'UserName', 'FullName', 'Phone', 'Email', 'Address', 'Status', 'Action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchString: any;

  constructor(private myservice: MyserviceService,
              // tslint:disable-next-line:no-shadowed-variable
              private http: HttpClient,
              private ac: ActivatedRoute,
              private router: Router,
              private toar: ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
    });
  }

  ngOnInit() {
    this.ListUser();
    this.selection.clear();
  }

  ListUser() {
    const testID = this.ac.snapshot.paramMap.get('Id');
    console.log(testID);
    this.http.get<string>('http://localhost:65170/api/TestAssignment/' + testID + '?action=GetAll', {headers: http()}).subscribe(
      value => {
        this.dataSource.data = JSON.parse(value);
        this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
      },
      err => {
        const errors = err.status + ',' + err.message;
        this.myservice.changeError(errors);
      });
    console.log(this.dataSource);
    this.dataSource.sort = this.sort;
    this.selection.clear();
  }

  AddMutiple() {
    const Arr = [];
    this.selection.selected.forEach(item => {
      Arr.push({TestId: this.Id, UserId: item.UserId});

    });
    console.log(Arr);
    if (Arr.length > 0) {
      // tslint:disable-next-line:max-line-length
      this.http.post<string>('http://localhost:65170/api/TestAssignment?action=AddMutiple', JSON.stringify(Arr), {headers: http()}).subscribe((error) => {
          const err = parseInt(error, 10);
          if (err > 0) {
            this.toar.success('success', ' User Number');
          }
          this.ListUser();
          this.selection.clear();
        },
        err => {
          const errors = err.status + ',' + err.message;
          this.myservice.changeError(errors);
        });
    } else {
      this.toar.info('please choice user', ' User Number');
    }

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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.UserId + 1}`; /// row.id
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onSearch() {
    
  }

  navigateToEdit(Id: any) {
    
  }

  deleteTest(Id: any) {
    
  }
}
