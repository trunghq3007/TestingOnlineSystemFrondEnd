import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exam } from 'src/app/exam';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit {
  filterExam: FormGroup;
  listExam: {} = {};
  exams: Exam[] = [];
<<<<<<< HEAD
  searchString: string;
  filter: [];
  detailexam: any = {};
  examInfo: Exam []=[];
  displayedColumn: string[] = ['select', 'NameExam', 'CreateBy', 'QuestionNumber', 'Status','SpaceQuestionNumber', 'CreateAt', 'Note', 'Action'];
=======

  searchString: string;
  filter: [];
  examInfo: Exam;
  displayedColumn: string[] = ['select', 'NameExam', 'CreateBy', 'QuestionNumber', 'SpaceQuestionNumber', 'NameCategory', 'Status', 'CreateAt', 'Note', 'Action'];
>>>>>>> 3a22d0e1d607d2052c63feaff1cfa052f781835c
  dataSource = new MatTableDataSource<Exam>(this.exams);
  selection = new SelectionModel<Exam>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: HttpClient, private router: Router
    , private toasr: ToastrService, private fb: FormBuilder) { }
<<<<<<< HEAD
=======






>>>>>>> 3a22d0e1d607d2052c63feaff1cfa052f781835c
  onSubmit() {
    {
      const httpOptions = { 
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      if (this.filterExam.valid) {
        const value = this.filterExam.value;
        this.http.post<string>('http://localhost:65170/api/Exam?action=filter', JSON.stringify(value), httpOptions).subscribe({
          next: (res) => {
<<<<<<< HEAD
            console.log(value);
=======


>>>>>>> 3a22d0e1d607d2052c63feaff1cfa052f781835c
            this.dataSource.data = JSON.parse(res);
          },
          error: (err) => {

            console.log('false');
          }

        });
      }
    }
  }


  listexams() {
    this.http.get<string>('http://localhost:65170/api/Exam').subscribe(
      value => {
        this.exams = JSON.parse(value);
        for (let i = 0; i < this.exams.length; i++) {
          if(this.exams[i].Category != null){
            console.log(this.exams[i].Category);
            this.exams[i].NameCategory = this.exams[i].Category.Name;
          }
        }
        this.dataSource.data = this.exams;
        console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);

      });
  }

  ngOnInit() {
    this.http.post<string>('http://localhost:65170/api/Exam?action=getfilter', {}).subscribe(
      value => {

        this.listExam = JSON.parse(value);
      });
    this.filterExam = this.fb.group({
      Timetest: ['',],
      CreateBy: ['',],
      QuestionNumber: ['',],
      Status: '',
      CreateAt: '',
      TypeExam: ['']
    });
    this.listexams();
    this.dataSource.sort = this.sort;
  }
  detail(examID) {

    this.http.get<string>('http://localhost:65170/api/Exam/' + examID).subscribe
      (
        value => {
         
          this.examInfo=JSON.parse(value);
          //console.log(this.examInfo);

        }
      );
  }
  detailQuestion(examID) {

    this.http.get<string>('http://localhost:65170/api/ExamQuestions/' + examID).subscribe
      (
        value => {
          this.examInfo = JSON.parse(value);

        }
      );
  }
  onFilter() {
    const httpOptions = { 
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const value = this.filterExam.value;
    this.http.post<string>('http://localhost:65170/api/Exam/?action=filter', JSON.stringify(value),httpOptions).subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });

    // const value = this.filterExam.value;
    // this.http.post<string>('http://localhost:65170/api/Exam?action=getfilter', JSON.stringify(value)).subscribe(value => {
    //   this.dataSource.data = JSON.parse(value);
    // });
  }
  onSearch() {
    this.http.get<string>('http://localhost:65170/api/Exam?searchString=' + this.searchString).subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  navigateToEdit(examID: string) {
    this.router.navigate(['/exam', 'update', examID,]);
  }


  exportExam(examID: number) {
    if (confirm('you want to export record')) {
      this.http.get<string>('http://localhost:65170/api/Exam/' + examID + '?action=export').subscribe
        (
          res => {
            this.listexams();
            this.toasr.warning('Export Successfully', 'Exam.Export');

          });
    }
  }

  deleteExam(examID: number) {
    if (confirm('you want to delete record')) {
      this.http.delete('http://localhost:65170/api/Exam/' + examID).subscribe
<<<<<<< HEAD
      (
        res => {
        if (res ==true) {
          this.exams = this.exams.filter(ex => ex.Id !== examID);
         
        }
        else if (res == false) {
          confirm("Is Public not Delete");
          this.toasr.error('Delete failed','Exam.Delete');
        } else{
          this.toasr.success('Delete Successfully','Exam.Delete');
        }
        this.listexams();
        
       
      });
=======
        (
          res => {
            if (res == true) {
              this.exams = this.exams.filter(ex => ex.Id !== examID);
            }
            else if (res == false) {
              confirm("Is Public not Delete");
            }
            this.listexams();
            this.toasr.warning('Delete Successfully', 'Exam.Delete');

          });
>>>>>>> 3a22d0e1d607d2052c63feaff1cfa052f781835c
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Exam): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.NameExam + 1}`;
  }


}
