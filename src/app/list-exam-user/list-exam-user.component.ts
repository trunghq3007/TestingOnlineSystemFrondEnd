import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Isemaster } from '../isemaster';
import { Router ,ActivatedRoute} from '@angular/router';
import { Exam } from '../exam';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
@Component({
  selector: 'app-list-exam-user',
  templateUrl: './list-exam-user.component.html',
  styleUrls: ['./list-exam-user.component.scss']
})
export class ListExamUserComponent implements OnInit {
  semester: Exam[]=[];
  constructor(private http: HttpClient, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    const IdQuestion = this.activedRoute.snapshot.paramMap.get('id')
    this.http.get<string>('http://localhost:65170/api/SemesterCustomer/'+IdQuestion).subscribe(
      value => {

        this.semester = JSON.parse(value).Data;
        console.log(IdQuestion);
        console.log(value);
        
      });
  }
  listExam(id)
  {
   
  }

}
