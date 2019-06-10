import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Exam } from 'src/app/exam';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
export interface questions {
  QuesId: number;
  Content: string;
  Level: number;
  Suggestion: string;
  Type: number;
  Media: string;
  Status: number;
  CreatedBy: string;
  CreatedDate: Date;
  UpdatedBy: string;
  UpdatedDate: Date;
  CategoryName: string;
}




@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit {
  // userForm: FormGroup;
  listfilter: {} = {};
  questions: questions[] = [];

  searchString: string;
  examID = this.ac.snapshot.paramMap.get('examID');
  numberQuestion: number;
  filterForm: FormGroup;
  dataSource = new MatTableDataSource<questions>(this.questions);


  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['select', 'Id', 'Category', 'Content', 'Level', 'Suggestion', 'Type', 'CreatedBy', 'CreatedDate', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  selection = new SelectionModel<questions>(true, []);
  constructor(private http: HttpClient, private ac: ActivatedRoute, private fb: FormBuilder) { }
  get StartDate(): FormControl {
    return this.filterForm.get('CreatedDate') as FormControl;
  }
  get EndDate(): FormControl {
    return this.filterForm.get('CreatedBy') as FormControl;
  }
  get Level(): FormControl {
    return this.filterForm.get('Level') as FormControl;
  }
  get Type(): FormControl {
    return this.filterForm.get('Type') as FormControl;
  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      CreatedDate: [''],
      Category: [''],
      Level: [''],
      CreatedBy: [''],
      Type: ['']

    });
    this.listQuestion();

    this.http.post<string>('http://localhost:65170/api/ExamQuestions/?action=getfillter', {}).subscribe(
      value => {
        this.listfilter = JSON.parse(value);
        console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
      });
    this.dataSource.sort = this.sort;

  }
  listQuestion() {
    const examID = this.ac.snapshot.paramMap.get('examID');
    this.http.get<string>('http://localhost:65170/api/ExamQuestions/' + examID + '?action=GetAll').subscribe(
      value => {
        this.dataSource.data = JSON.parse(value);
        console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
      });
  }


  AddMutiple() {
    let Arr = [];
    const examID = this.ac.snapshot.paramMap.get('examID');
    this.selection.selected.forEach(item => {
      Arr.push({ ExamId: examID, QuestionId: item.QuesId });
    })
    console.log(Arr);
    console.log(JSON.stringify(Arr));
    this.http.post<string>('http://localhost:65170/api/ExamQuestions/?action=AddMutiple', JSON.stringify(Arr), httpOptions).subscribe((error) => {

      confirm('inserted' + ' ' + error + ' ' + 'records in Exam');
      this.listQuestion();

    });
  }

  random() {
    if (this.numberQuestion < 0) {
      confirm('random number is greater than 0');
    } else if (isNaN(this.numberQuestion)) {
      confirm('random number must is number');
    } else {
      const examID = this.ac.snapshot.paramMap.get('examID');
      let Arr = { Total: this.numberQuestion, ExamId: examID };
      this.http.post<string>('http://localhost:65170/api/ExamQuestions?action=random', JSON.stringify(Arr), httpOptions).subscribe((error) => {

        confirm('inserted' + ' ' + error + ' ' + 'records in Exam');
        this.listQuestion();

        console.log(error)
      });
    }

  }
  onSearch() {
    this.http.get<string>('http://localhost:65170/api/ExamQuestions?searchString=' + this.searchString).subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });
  }
  onFilter() {
    const value = this.filterForm.value;
    console.log(value);
    this.http.post<string>('http://localhost:65170/api/ExamQuestions/?action=fillter', JSON.stringify(value), httpOptions).subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);

    });
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
  checkboxLabel(row?: questions): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.QuesId + 1}`;
  }






}
