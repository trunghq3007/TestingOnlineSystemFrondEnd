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
  Id: number;
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
  Category_Id: number;
}
export interface detailExam {
  QuesId: number;
  nameExam: string;
  Content: string;
  Level: number;
  Suggestion: string;
 Type:number;
  Status: number;
  CreatedBy: string;
  CreatedDate: Date;
 
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
  detailExams: detailExam[] = [];
  searchString: string;
  numberQuestion:number;
  filterForm: FormGroup;
  dataSource = new MatTableDataSource<questions>(this.questions);
  dataSourcedetail = new MatTableDataSource<detailExam>(this.detailExams);

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['select','Id', 'Content', 'Level', 'Suggestion', 'Type', 'CreatedBy', 'CreatedDate', 'Action'];
  displayedColumnDetail: string[] = ['QuesId','nameExam', 'Content', 'Level', 'Suggestion', 'CreatedBy', 'CreatedDate', 'Action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<questions>(true, []);
  selectionDetail = new SelectionModel<detailExam>(true, []);
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
    this.http.get<string>('http://localhost:65170/api/ExamQuestions').subscribe(
      value => {
        this.dataSource.data = JSON.parse(value);
        console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
      });
    //detail exam + examID
    const examID = this.ac.snapshot.paramMap.get('examID');
    this.http.get<string>('http://localhost:65170/api/ExamQuestions/' + examID).subscribe(
      value => {
        this.dataSourcedetail.data = JSON.parse(value);
        console.log(JSON.parse(value));
        console.log(this.dataSourcedetail.paginator = this.paginator, this.dataSourcedetail.sort = this.sort);
      });

    this.http.post<string>('http://localhost:65170/api/ExamQuestions/?action=getfillter', {}).subscribe(
      value => {
        this.listfilter = JSON.parse(value);
        console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
      });
    this.dataSource.sort = this.sort;
  }
  deleteQuestion(QuesId) {
    console.log(QuesId);
    this.http.delete('http://localhost:65170/api/ExamQuestions/' +QuesId).subscribe
      (
        value => {
          const examID = this.ac.snapshot.paramMap.get('examID');
          this.http.get<string>('http://localhost:65170/api/ExamQuestions/' + examID).subscribe(
      value => {
        this.dataSourcedetail.data = JSON.parse(value);
        console.log(JSON.parse(value));
        console.log(this.dataSourcedetail.paginator = this.paginator, this.dataSourcedetail.sort = this.sort);
      });
  
        
        });

  }
  addQuestion(Id) {
    const examID = this.ac.snapshot.paramMap.get('examID');

    let Data = { ExamId: examID, QuestionId: Id };
    this.http.post<string>('http://localhost:65170/api/ExamQuestions', JSON.stringify(Data), httpOptions).subscribe({
      next: 
      (response) => {
        
        if(response==1){
          const examID = this.ac.snapshot.paramMap.get('examID');
          this.http.get<string>('http://localhost:65170/api/ExamQuestions/' + examID).subscribe(
            value => {
              this.dataSourcedetail.data = JSON.parse(value);
              console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
            });
          confirm('success');
        }else if(response==0){
          confirm('question exist in exam');
        }
        
      },
      error: (err) => {
        console.log(err);
        confirm('false')
      }

    });

  }
  AddMutiple(){
    let Arr=[];
    const examID = this.ac.snapshot.paramMap.get('examID');
    this.selection.selected.forEach(item=>{
      // Arr+=  examID+','+item.Id+',';
     Arr.push( { ExamId: examID, QuestionId: item.Id }) ;
    })
    
    console.log(JSON.stringify(Arr));
    this.http.post<string>('http://localhost:65170/api/ExamQuestions/?action=AddMutiple',JSON.stringify(Arr),httpOptions).subscribe((e)=>{

    })
  }
  random(){
    // this.http.post<string>('')
  }
  onSearch() {
    this.http.get<string>('http://localhost:65170/api/Question?searchString=' + this.searchString).subscribe(value => {
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }






}
