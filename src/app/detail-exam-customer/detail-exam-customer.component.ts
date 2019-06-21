import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Isemaster } from '../isemaster';
import { Router ,ActivatedRoute} from '@angular/router';
import { DetailExam } from '../detailExams';
import { http } from '../http-header';
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
  
  chuoi : string;
  


  ngOnInit() {
 
    const IdQuestion = this.activedRoute.snapshot.paramMap.get('id')
    this.http.get<string>('http://localhost:65170/ExamDetails/'+IdQuestion,{ headers: http() }).subscribe(
      value => {

        this.list = JSON.parse(value);
        console.log(IdQuestion);
        console.log(value);
        this.chuoi = '/thi/1/'+IdQuestion+'/thi' ;
      });
  }
  test(){
    var time = new Date();
       
    console.log(time.getHours());
    var getdate= time.getHours()*60+ time.getMinutes();
    localStorage.setItem('SecondTest', getdate.toString());
  }

}
