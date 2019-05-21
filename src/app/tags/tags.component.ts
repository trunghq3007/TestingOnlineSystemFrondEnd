import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tag } from '../Tag';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Sort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})

export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  TagIdDelete = '';
  submitted = false;
  ctForm: FormGroup;
  tag: Tag;

  displayedColumn: string[] = ['select', 'Name', 'Description', 'Status', 'Action'];
  dataSource = new MatTableDataSource<Tag>(this.tags);
  data = Object.assign(TagsComponent);
  selection = new SelectionModel<Tag>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  reverse: boolean = false;

  ///format status number --string
  FormatData(data) {
    if (data) {
      data.map(item => {
        item.StatusName = item.Status === 1 ? 'Active' : 'Disable';
      });
      return data;
    }
  }
  get Name(): FormControl {
    return this.ctForm.get('Name') as FormControl;


  }
  get Description(): FormControl {
    return this.ctForm.get('Description') as FormControl;
  }
  get Status(): FormControl {
    return this.ctForm.get('Status') as FormControl;
  }


  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {


    this.http.get<string>('http://localhost:65170/api/Tag').subscribe(value => {
      this.dataSource.data = this.FormatData(JSON.parse(value));
      console.log(this.FormatData(JSON.parse(value)));
      (this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);

    });



    this.ctForm = new FormGroup(
      {
        Name: new FormControl('', [Validators.required]),
        Description: new FormControl('', [Validators.required]),
        Status: new FormControl('', [Validators.required])

      }
    );

    //edit//


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
  checkboxLabel(row?: Tag): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Name + 1}`;
  }


  //
  //delete all
  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.dataSource.data.findIndex(d => d.Id === this.TagIdDelete);
      // console.log(this.data.findIndex(d => d === item));
      // this.dataSource.data.splice(index, 1);
      this.http.delete('http://localhost:65170/api/Tag/' + item.Id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(b => b.Id !== item.Id);

      }



      );

      this.dataSource = new MatTableDataSource<Tag>(this.dataSource.data);
    });
    this.toastr.warning('Delete all success!', 'List Tag!');

    this.selection = new SelectionModel<Tag>(true, []);
  }




  //end




  //lay id
  deleteTag(TagId: string) {

    this.TagIdDelete = TagId;



    // this.http.delete('http://localhost:65170/api/Tag/' + TagId).subscribe(() => {
    //   this.tags = this.tags.filter(b => b.Id !== TagId)
    // }


    //);
  }
  ///delete
  delete() {
    console.log(this.TagIdDelete)
    this.http.delete('http://localhost:65170/api/Tag/' + this.TagIdDelete).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(b => b.Id !== this.TagIdDelete);


    }







    );
    this.toastr.success('Delete success!', 'List Tag!');

  }





  //create

  onSubmit() {
    if (this.ctForm.valid) {
      const value = this.ctForm.value;
      console.log(value);
      this.http.post('http://localhost:65170/api/Tag/', JSON.stringify(value), httpOptions)
        .subscribe({
          next: (res) => {
            this.http.get<string>('http://localhost:65170/api/Tag/').subscribe(value => {
              this.dataSource.data = this.FormatData(JSON.parse(value));
              this.toastr.info('Create success!', ' Tag!');
            });
            this.ctForm.reset();
          },

          error: (err) => {
            console.error(err);
          }

        });



    }


  }



  //edit


  onEdit(TagId: string) {


    this.http.get<string>('http://localhost:65170/api/Tag/' + TagId).subscribe(value => {
      const tag = JSON.parse(value);
      const StatusName = tag.Status === 1 ? 'Active' : 'Disable';
      this.tag = { ...JSON.parse(value), StatusName };
      this.ctForm.patchValue(this.tag);

    });



  }

  reset() {
    this.ctForm.reset();
  }

  Edit(TagId: string) {
    console.log('click');
    if (this.ctForm.valid) {
      const value = this.ctForm.value;
      const formData = {
        ...this.tag,
        ...value
      };
      this.http
        .put('http://localhost:65170/api/Tag/' + TagId, formData)
        .subscribe(
          {
            next: (res) => {
              this.http.get<string>('http://localhost:65170/api/Tag/').subscribe(value => {
                this.dataSource.data = this.FormatData(JSON.parse(value));
                this.toastr.success('Edit success!', 'List Tag!');
              });

            },

            error: (err) => {
              console.error(err);
            }

          }

        );




    }


  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


}
