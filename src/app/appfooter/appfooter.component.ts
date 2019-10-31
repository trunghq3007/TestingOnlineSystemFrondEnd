import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-appfooter',
  templateUrl: './appfooter.component.html',
  styleUrls: ['./appfooter.component.scss']
})
export class AppfooterComponent implements OnInit {
  constructor() {
  }
  date: string;

  ngOnInit() {
    this.date = moment(new Date()).format('YYYY');
  }

}
