import { Component, OnInit, Input, OnDestroy, Pipe, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Question } from '../question';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { TestProcessing } from '../test-processing';
import { ProcessingTest } from '../processing-test'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
export interface Result {
  Answer: {
    Content: string,
    Score: number
  };
  Content: string;
  TestName: string;
  TestTime: string;
  Type: string;
}
@Component({
  selector: 'app-thi-tu-luan',
  templateUrl: './thi-tu-luan.component.html',
  styleUrls: ['./thi-tu-luan.component.scss']
})
export class ThiTuLuanComponent implements OnInit {
  results: Result[];
  Idtest = this.activateRoute.snapshot.paramMap.get('testId');
  TestTimeNo = this.activateRoute.snapshot.paramMap.get('testTimeNo');
  answer = [];
  arrayId = [];
  a: number;
  constructor(private http: HttpClient, public activateRoute: ActivatedRoute, private router: Router, private myservice: MyserviceService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
    });
  }

  ngOnInit() {
    if (sessionStorage.getItem('user')) {
      var Users = sessionStorage.getItem('user');
      var LisUser = Users.split(',');
      var UserId = LisUser[0];
    }
    this.http.get<string>('http://localhost:65170/api/TestAssignment?UserId=' + UserId + '&TestId=' + this.Idtest + '&TestTimeNo=' + this.TestTimeNo
      , { headers: http() }).subscribe(
        value => {
          this.results = JSON.parse(value);
        });
  }

  Submit() {
    debugger
   var test= this.results;
  }

}
