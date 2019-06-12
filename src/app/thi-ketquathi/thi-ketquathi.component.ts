import { Component, OnInit } from '@angular/core';
import{Iresult} from '../iresult';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-thi-ketquathi',
  templateUrl: './thi-ketquathi.component.html',
  styleUrls: ['./thi-ketquathi.component.scss']
})
export class ThiKetquathiComponent implements OnInit {

list:Iresult={} as Iresult;
formApply: FormGroup;

Id = this.activatedRoute.snapshot.paramMap.get('Id');

get TestName(): FormControl {
  return this.formApply.get('TestName') as FormControl
}
get FullName(): FormControl {
  return this.formApply.get('FullName') as FormControl
}
get Email(): FormControl {
  return this.formApply.get('Email') as FormControl
}
get SemesterName(): FormControl {
  return this.formApply.get('SemesterName') as FormControl
}

  constructor( private result:FormBuilder ,private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.formApply=this.result.group({
      TestName: [''],
      FullName: [''],
      Email: [''],
      SemesterName: [''],
    });

    this.http
    .get<string>('http://localhost:65170/semesterExam/result/' + this.Id)
    .subscribe(
      value => {
        this.list = JSON.parse(value);
    
        console.log(this.list);
      
        
        this.formApply.patchValue(this.list);//a tiep
      }
    );
   
  }

}
