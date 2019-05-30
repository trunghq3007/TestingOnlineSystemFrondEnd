import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../question';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-view-list-question',
  templateUrl: './view-list-question.component.html',
  styleUrls: ['./view-list-question.component.scss']
})
export class ViewListQuestionComponent implements OnInit {
  const httpOptions = {
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
<<<<<<< HEAD
      let source = JSON.parse(value).Data;
=======
      let source = JSON.parse(value);
>>>>>>> parent of f699ba1... nhvan
      let tagNames = '';
      for (let index = 0; index < source.length; index++) {
        let element = source[index];
        let tag = element.Tags;
        if (tag && tag.length > 0) {
          for (let i = 0; i < tag.length; i++) {
            tagNames += tag[i].Name + ', ';
          }
        }
        if(element.Level ==1) element.LevelString="Easy";
        if(element.Level ==2) element.LevelString="Medium";
        if(element.Level ==3) element.LevelString="Difficult";
        element.TagNames = tagNames;
      };
      this.dataSource.data = source;
      this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
    });
  }

  // deleteQuestion(questionId: string) {
  //   this.http.delete('http://localhost:65170/api/question/' + questionId).subscribe(() => {
  //     this.dataSource.data = this.dataSource.data.filter(question => question.Id !== questionId);
  //   });
  // }
  // delete
  delete(Id) {
    this.questionId = Id;
    console.log(this.questionId);

  }
<<<<<<< HEAD
  exportQuestion() {
    this.http.post<string>('http://localhost:65170/api/question?action=export', { 'export': '1' }, this.httpOptions).subscribe(value => {
      const res: ResultObject = JSON.parse(value);
      if (res.Success >= 1) {
        let a = document.createElement('a');
        a.href = res.Message;
        a.click();
      } else {
        confirm('export fail');
      }
    });
  }

=======
>>>>>>> parent of f699ba1... nhvan
  deleteQuestion() {
    this.http.delete('http://localhost:65170/api/question/' + this.questionId).subscribe(
      res => {

<<<<<<< HEAD
        if (result.Success >= 1) {
          this.dataSource.data = this.dataSource.data.filter(s => s.Id !== this.questionId);
          this.toastr.success('Delete success!', '');
        }
=======
        if (res == 1) {
          this.dataSource.data = this.dataSource.data.filter(s => s.Id !== this.questionId);
          this.toastr.success('Delete success!', '');
        }

        else if (res == 0) {
          confirm('Đang có câu hỏi trong Category');
        }
>>>>>>> parent of f699ba1... nhvan
        else {
          confirm('Lỗi');
        }

      }

    );

  }


  navigateToEdit(Id: string) {
    this.router.navigate(['EditQuestion/', Id,]);
  }
  navigateToDetail(Id: string) {
    this.router.navigate(['DetailQuestion/', Id,]);
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
  // masterToggle() {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach(row => this.selection.select(row));

  // }
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
<<<<<<< HEAD
 
      let source = JSON.parse(value).Data;
=======
      debugger;
    let source = JSON.parse(value);
>>>>>>> parent of f699ba1... nhvan
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

}
