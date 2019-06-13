import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-export-exam',
  templateUrl: './export-exam.component.html',
  styleUrls: ['./export-exam.component.scss']
})
export class ExportExamComponent implements OnInit {
exam:string;
  constructor(private http: HttpClient, private router: Router, private ac: ActivatedRoute) { }

  ngOnInit() {
    //confirm('Bạn có muốn lưu file ?? ')
    const examID = this.ac.snapshot.paramMap.get('Id');
    this.http.get<string>('http://localhost:65170/api/Exam/' + examID+'?action=exportExam').subscribe({
      next: (res) => {
        this.exam= JSON.parse(res) ;
        console.log(res);
       
       
      },
      error: (err) => {
       
        console.log('false');
      }

    });
    setTimeout(()=>{
      window.print();
    },10000);
  }

}
