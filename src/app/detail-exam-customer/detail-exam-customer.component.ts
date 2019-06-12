import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Isemaster } from '../isemaster';
import { Router ,ActivatedRoute} from '@angular/router';
import { DetailExam } from '../detailExams';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
@Component({
  selector: 'app-detail-exam-customer',
  templateUrl: './detail-exam-customer.component.html',
  styleUrls: ['./detail-exam-customer.component.scss']
})
export class DetailExamCustomerComponent implements OnInit {
  list: DetailExam;
  constructor(private http: HttpClient, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
 
    const IdQuestion = this.activedRoute.snapshot.paramMap.get('id')
    this.http.get<string>('http://localhost:65170/ExamDetails/'+IdQuestion).subscribe(
      value => {

        this.list = JSON.parse(value);
        console.log(IdQuestion);
        console.log(value);
      });
  }

}
