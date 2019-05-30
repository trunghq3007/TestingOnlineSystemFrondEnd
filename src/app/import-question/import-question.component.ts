import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-import-question',
  templateUrl: './import-question.component.html',
  styleUrls: ['./import-question.component.scss']
})
export class ImportQuestionComponent implements OnInit {
  form: FormGroup;
  error: string;
  uploadResponse: string;

  constructor(private http: HttpClient,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }
  saveQuestion() {
    console.log(this.form.value);
    const formData = new FormData();
    formData.append('file', this.form.get('avatar').value);

    this.http.post<string>  ('http://localhost:65170/api/question?action=import', formData)
      .subscribe(
        (res) => this.uploadResponse = res,
<<<<<<< HEAD
        (err) => this.error = err,

=======
        (err) => this.error = err
>>>>>>> parent of f699ba1... nhvan
      );


  }

}
