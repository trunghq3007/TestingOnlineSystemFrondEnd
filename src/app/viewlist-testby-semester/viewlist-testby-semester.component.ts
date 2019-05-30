import { Component, OnInit } from '@angular/core';
import { Isemaster } from '../isemaster';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Testbysemester } from '../testbysemester';

@Component({
  selector: 'app-viewlist-testby-semester',
  templateUrl: './viewlist-testby-semester.component.html',
  styleUrls: ['./viewlist-testby-semester.component.scss']
})
export class ViewlistTestbySemesterComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private semaster: FormBuilder, private fl: FormBuilder, private http: HttpClient, private router: Router, public dialog: MatDialog) { }
  TestBySemester: Testbysemester[] = [];
  dataSource = new MatTableDataSource<Testbysemester>(this.TestBySemester);
  displayedColumn: string[] = [ 'Id', 'TestName', 'Status','TestTime','NumberTime'];
  ngOnInit() {
    this.http.get<string>('http://localhost:65170/api/SemesterExam/1?IsGetTests').subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(this.dataSource);
      console.log(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });
  }
  // Id:number;
  // TestName : string;
  // Status :string;

  // TestTime: string;
}
