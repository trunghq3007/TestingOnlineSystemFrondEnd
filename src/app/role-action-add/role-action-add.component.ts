import { RoleActionAdd } from '../role-action-add';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ResultObject } from '../result-object';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-role-action-add',
  templateUrl: './role-action-add.component.html',
  styleUrls: ['./role-action-add.component.scss']
})
export class RoleActionAddComponent implements OnInit {

  roleactionadds: RoleActionAdd[] = [];
  roleactionadd: RoleActionAdd = undefined;
  actionId = '';
  check: string;
  ObjFormGroup: FormGroup;
  roleId: string;
  displayedColumn: string[] = ['ActionName', 'Description', 'Action'];
  dataSource = new MatTableDataSource<RoleActionAdd>(this.roleactionadds);
  selection = new SelectionModel<RoleActionAdd>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
              private myservice: MyserviceService,
              private http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
    });
  }

  get RoleName(): FormControl {
    return this.ObjFormGroup.get('RoleName') as FormControl;
  }

  ngOnInit() {
    const RoleId = this.activatedRoute.snapshot.paramMap.get('RoleId');
    console.log(RoleId);
    this.http.get<string>('http://localhost:65170/api/RoleAction/?idRole=' + RoleId, {headers: http()}).subscribe(value => {
      this.dataSource.data = JSON.parse(value).Data;
      console.log(this.roleactionadds);
      this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
    });
  }

  clickToGoBack() {
    const RoleId = this.activatedRoute.snapshot.paramMap.get('RoleId');
    this.router.navigate(['Role/', RoleId]);
  }

  AddActionToRole(actionId) {
    if (confirm('Are you sure you to add this action?')) {
      const RoleId = this.activatedRoute.snapshot.paramMap.get('RoleId');
      console.log(this.actionId);
      console.log(RoleId);
      const arr = {ActionId: actionId, roleId: RoleId};
      //  this.dataSource.data.splice(index,1);
      this.http.post<string>('http://localhost:65170/api/RoleAction/', JSON.stringify(arr), {headers: http()}).subscribe(
        value => {
          const result: ResultObject = JSON.parse(value);
          if (result.Success >= 1) {
            this.toastr.success('Create success !', '');
            this.http.get<string>('http://localhost:65170/api/RoleAction/?idRole=' + RoleId, {headers: http()}).subscribe(value => {
              this.dataSource.data = JSON.parse(value).Data;
              console.log(this.roleactionadds);
              this.dataSource = new MatTableDataSource<RoleActionAdd>(this.dataSource.data);
              this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
            });
          } else {
            this.toastr.success('Create fail !', '');
          }

        }
      );

    }
  }
}
