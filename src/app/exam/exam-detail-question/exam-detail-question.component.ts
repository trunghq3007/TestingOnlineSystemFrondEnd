import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
export interface detailExam {
  QuesId: number;
  nameExam: string;
  Content: string;
  Level: number;
  Suggestion: string;
  Type: number;
  Status: number;
  CreatedBy: string;
  CreatedDate: Date;

}
@Component({
  selector: 'app-exam-detail-question',
  templateUrl: './exam-detail-question.component.html',
  styleUrls: ['./exam-detail-question.component.scss']
})
export class ExamDetailQuestionComponent implements OnInit {

  // userForm: FormGroup;
  listfilter: {} = {};
  detailExams: detailExam[] = [];
  searchString: string;
  examID = this.ac.snapshot.paramMap.get('examID');
  dataSource = new MatTableDataSource<detailExam>(this.detailExams);

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['select', 'QuesId', 'nameExam', 'Content', 'Level', 'Suggestion', 'CreatedBy', 'CreatedDate', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  selection = new SelectionModel<detailExam>(true, []);
  constructor(private http: HttpClient, private ac: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.listQuestionDetail();
  }
  listQuestionDetail() {

    const examID = this.ac.snapshot.paramMap.get('examID');
    this.http.get<string>('http://localhost:65170/api/ExamQuestions/' + examID + '?action=GetById').subscribe(
      value => {
        this.dataSource.data = JSON.parse(value);
        
        console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
        this.dataSource.sort = this.sort;
      });
  }
  deleteQuestion(QuesId) {
    const examID = this.ac.snapshot.paramMap.get('examID');
    let Arr = { ExamId: examID, QuestionId: QuesId };
 
    this.http.delete('http://localhost:65170/api/ExamQuestions/' + JSON.stringify(Arr), httpOptions).subscribe
      (
        value => {
          this.listQuestionDetail();
        });

  }
  DeleteMutiple() {
    let Arr = [];
    const examID = this.ac.snapshot.paramMap.get('examID');
    this.selection.selected.forEach(item => {
      Arr.push({ ExamId: examID, QuestionId: item.QuesId });
    })
   
    this.http.post<string>('http://localhost:65170/api/ExamQuestions?action=DeleteMutiple', JSON.stringify(Arr), httpOptions).subscribe(value => {

      this.listQuestionDetail();
      confirm('success');
    })
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: detailExam): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.QuesId + 1}`;
  }





}
