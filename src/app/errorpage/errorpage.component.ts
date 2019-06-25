import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.scss']
})
export class ErrorpageComponent implements OnInit {
errors:string;
status;
message;
description;
checked=true;
  constructor(private myservice:MyserviceService) { }

  ngOnInit() {
    
    
    console.log(this.checked)
    this.myservice.currentError.subscribe(message => this.errors = message);
    var ListErrors=this.errors.split(',');
    console.log(ListErrors);
    this.status=ListErrors[0];
  
    // console.log('sdsf'+this.message);
    if(this.status==401){
      this.message=ListErrors[1];
      this.description=" Contact admin to access this feature";
    }else if(this.status==500){
      this.message=ListErrors[1];
      this.description=" Error! An error occurred. Please try again later";
    }
    
    if(this.status!=""){
      this.checked=false
    }else{
      this.checked=true

    }
  }

}
