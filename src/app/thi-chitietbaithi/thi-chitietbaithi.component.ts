import { MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-thi-chitietbaithi',
  templateUrl: './thi-chitietbaithi.component.html',
  styleUrls: ['./thi-chitietbaithi.component.scss']
})
export class ThiChitietbaithiComponent implements OnInit {
  TestId = this.activateRoute.snapshot.paramMap.get('TestId');

  constructor(private myservice: MyserviceService,
              private semaster: FormBuilder,
              private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              public dialog: MatDialog,
              public activateRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('2');
    });
  }

  ngOnInit() {
  }

}
