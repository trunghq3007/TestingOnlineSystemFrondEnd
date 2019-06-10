import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../question';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ResultObject } from '../result-object';

@Component({
  selector: 'app-view-list-question',
  templateUrl: './view-list-question.component.html',
  styleUrls: ['./view-list-question.component.scss']
})
export class ViewListQuestionComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  searchString: string;
  questionId = '';
  Question: Question[] = [];
  tagsFormApi: [];
  categoriesFormApi: [];
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
  displayedColumn: string[] = ['select', 'Category', 'CreatedBy', 'CreatedDate', 'Level', 'Content', 'Tag', 'Action'];
  dataSource = new MatTableDataSource<Question>(this.Question);
  formFillter: FormGroup = new FormBuilder().group({
    CreatedBy: '',
    StartDate: '',
    ToDate: '',
    Level: '',
    TagsId: '',
    CategoryId: '',
    Type: ''
  });
  selection = new SelectionModel<Question>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.getApiCategories();
    this.getApiTags();
    this.http.get<string>('http://localhost:65170/api/question/').subscribe(value => {
      let source = JSON.parse(value).Data;
      let tagNames = '';
      for (let index = 0; index < source.length; index++) {
        let element = source[index];
        let tag = element.Tags;
        if (tag && tag.length > 0) {
          for (let i = 0; i < tag.length; i++) {
            tagNames += tag[i].Name + ', ';
          }
        }
        if (element.Level == 1) element.LevelString = "Easy";3
        if (element.Level == 2) element.LevelString = "Medium";
        if (element.Level == 3) element.LevelString = "Difficult";
        element.TagNames = tagNames;
      };
      this.dataSource.data = source;
      this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
    });

  }
  delete(Id) {
    this.questionId = Id;
    console.log(this.questionId);

  }


  exportQuestion() {
    debugger;

    this.http.get<ResultObject>('http://localhost:65170/upload/exportQuestion', this.httpOptions).subscribe(value => {
      if (value.Success >= 1 && value.Status===200) {
        let a = document.createElement('a');
        a.href = 'http://localhost:65170/upload/DownloadFileExport?fileName=' + value.Message;
        a.click();
      } else {
        confirm('export fail');
      }
    });
    err =>{
      if(err.status == 404){ console.log("404 founded")}
    }
  }


  deleteQuestion() {
    this.http.delete<string>('http://localhost:65170/api/question/' + this.questionId).subscribe(
      res => {
        const result: ResultObject = JSON.parse(res);
        if (result.Success >= 1) {
          this.dataSource.data = this.dataSource.data.filter(s => s.Id !== this.questionId);
          this.toastr.success('Delete success!', '');

        }
        else if (result.Success == 0) {

          confirm('Đang có câu hỏi trong Category');

        }

      }
    );
  }
  navigateToEdit(Id: string) {
    this.router.navigate(['/question', Id, 'update']);
  }
  navigateToDetail(Id: string) {
    this.router.navigate(['/question', Id, 'detail']);
  }

  onSearch() {
    const searchObject = {
      PageIndex: 1,
      PageSize: 10,
      searchString: this.searchString
    }

    this.http.post<string>('http://localhost:65170/api/question?action=search', JSON.stringify(searchObject), this.httpOptions).subscribe(value => {
      this.Question = JSON.parse(value);
      this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
    })
  }
  bdown: boolean = false;
  buttondown() {
    this.bdown = !this.bdown;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

  }

  checkboxLabel(row?: Question): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }
  getApiTags() {
    this.http.get<string>('http://localhost:65170/api/tag/').subscribe(value => {
      this.tagsFormApi = JSON.parse(value);
    });
  }
  getApiCategories() {
    this.http.get<string>('http://localhost:65170/api/category/').subscribe(value => {
      this.categoriesFormApi = JSON.parse(value);
    });
  }

  fillterClick() {
    console.log(this.formFillter.value);
    this.http.post<string>('http://localhost:65170/api/question?action=fillter', JSON.stringify(this.formFillter.value), this.httpOptions).subscribe(value => {

      let source = JSON.parse(value).Data;

      let tagNames = '';
      for (let index = 0; index < source.length; index++) {
        let element = source[index];

        let tag = element.Tags;
        if (tag && tag.length > 0) {
          for (let i = 0; i < tag.length; i++) {
            tagNames += tag[i].Name + ', ';
          }
        }
        element.TagNames = tagNames;
      };
      this.dataSource.data = source;
      this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
    });
  }
  public doFilter = (value: string) => {


    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
