import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-import-question',
  templateUrl: './import-question.component.html',
  styleUrls: ['./import-question.component.scss']
})
export class ImportQuestionComponent implements OnInit {
  ctForm: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.ctForm = new FormGroup({
      fileImport: new FormControl('')
    });
  }
  saveQuestion() {
    console.log(this.ctForm.value);
    const value = this.ctForm.value;
    this.http.post('https://localhost:44391/api/question?action=import', value)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        }
      });


  }

}
