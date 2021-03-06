import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Testbysemester } from '../testbysemester';
import { MyserviceService } from '../myservice.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-viewlist-testby-semester',
  templateUrl: './viewlist-testby-semester.component.html',
  styleUrls: ['./viewlist-testby-semester.component.scss']
})
export class ViewlistTestbySemesterComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) sort2: MatSort;
  Tests: Testbysemester[] = [];
  Tests2: Testbysemester[] = [];
  selection = new SelectionModel<Testbysemester>(true, []);
  createForm: FormGroup;
  Id = this.activateRoute.snapshot.paramMap.get('Id');
  dataSource = new MatTableDataSource<Testbysemester>(this.Tests);
  dataSource2 = new MatTableDataSource<Testbysemester>(this.Tests2);
  displayedColumn: string[] = ['select', 'Id', 'TestName', 'Status', 'TestTime', 'NumberTime', 'Action'];

  // tslint:disable-next-line:max-line-length
  constructor(private myservice: MyserviceService, private semaster: FormBuilder, private fb: FormBuilder, private http: HttpClient, private router: Router, public dialog: MatDialog, public activateRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('2');
    });
  }

  get GroupName(): FormControl {
    return this.createForm.get('') as FormControl;
  }

  get Creator(): FormControl {
    return this.createForm.get('') as FormControl;
  }

  get Description(): FormControl {
    return this.createForm.get('') as FormControl;
  }

  ngOnInit() {
    this.http.get<string>('http://localhost:65170/api/SemesterExam/' + this.Id + '?IsGetTests').subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(this.dataSource);
      console.log(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });


  }

  ADD() {

    this.http.get<string>('http://localhost:65170/api/SemesterExam/' + this.Id + '?IsgetTestsnotadd')
      .subscribe(value => {
        this.dataSource2.data = JSON.parse(value);
        console.log(this.dataSource2);
        console.log(' data source 2 :' + this.dataSource2.data);
        console.log(value);
        this.dataSource2.paginator = this.paginator2, this.dataSource2.sort = this.sort2;

      });


  }

  IsAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;


  }

  CheckBoxLabel(row?: Testbysemester): string {
    if (!row) {
      return `${this.IsAllSelected() ? 'select' : 'deselect'} all`;

    }
    return `${this.selection.isSelected(row) ? 'deselect ' : 'select '} row ${row.Id + 1}`;
  }

  MasterToggle() {
    this.IsAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // Id:number;
  // TestName : string;
  // Status :string;

  // TestTime: string;
}
