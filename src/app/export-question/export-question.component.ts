import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResultObject } from '../result-object';
import { Subscriber } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-export-question',
  templateUrl: './export-question.component.html',
  styleUrls: ['./export-question.component.scss']
})
export class ExportQuestionComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {

    // this.http.post<string>('http://localhost:65170/api/question?action=export', { 'export': '1' }, httpOptions).subscribe(value => {
    //   const res: ResultObject = JSON.parse(value);
    //   if (res.Success == 1) {
    //     let a = document.createElement('a');
    //     a.href = res.Message;
    //     a.click();
    //   } else {
    //     confirm('export fail');
    //   }
    // });
  }
}


