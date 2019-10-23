import { Component, OnInit } from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { FormControl, FormGroup } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-answer',
  templateUrl: './create-answer.component.html',
  styleUrls: ['./create-answer.component.scss']
})
export class CreateAnswerComponent implements OnInit {
  public Editor = ClassicEditorBuild;
  ansForm: FormGroup;

  constructor(private myservice: MyserviceService, private router: Router) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
    });
  }

  ngOnInit() {

    this.ansForm = new FormGroup({
      Media: new FormControl(''),
      Status: new FormControl(''),
      Content: new FormControl(''),
      IsTrue: new FormControl('')
    });
  }

}
