import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Role } from '../role';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  roles: Role[] = [];
  RoleId: '';
  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }
  displayedColumn: string[] = ['RoleId', 'RoleName', 'Description','Action'];
  dataSource = new MatTableDataSource<Role>(this.roles);
  selection = new SelectionModel<Role>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.http.get<string>('http://localhost:65170/api/Role').subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });

  }
  getId(id) {
    this.RoleId = id;
  }
}
