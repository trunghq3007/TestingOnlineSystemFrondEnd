import { Component, OnInit } from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-answer',
  templateUrl: './create-answer.component.html',
  styleUrls: ['./create-answer.component.scss']
})
export class CreateAnswerComponent implements OnInit {
  public Editor = ClassicEditorBuild;

  constructor() { }

  ansForm: FormGroup;
  ngOnInit() {

    this.ansForm = new FormGroup({
            Media: new FormControl(''),
            Status: new FormControl(''),
            Content: new FormControl(''),
            IsTrue: new FormControl('')
          });
  }

}
