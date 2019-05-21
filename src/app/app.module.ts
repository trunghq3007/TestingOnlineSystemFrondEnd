import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AppfooterComponent } from './appfooter/appfooter.component';
import { AppsettingComponent } from './appsetting/appsetting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewListQuestionComponent } from './view-list-question/view-list-question.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { CreateAnswerComponent } from './create-answer/create-answer.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { DetailQuestionComponent } from './detail-question/detail-question.component';
import { ImportQuestionComponent } from './import-question/import-question.component';
import { ExportQuestionComponent } from './export-question/export-question.component';
import { TagsComponent } from './tags/tags.component';
import { CategoryComponent } from './category/category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatInputModule, MatCheckboxModule, MatPaginatorModule, MatFormFieldModule, MatButtonModule, MatSortModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    AppsettingComponent,
    DashboardComponent,
    ViewListQuestionComponent,
    CreateQuestionComponent,
    CreateAnswerComponent,
    EditQuestionComponent,
    DetailQuestionComponent,
    ImportQuestionComponent,
    ExportQuestionComponent,
    TagsComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    CKEditorModule,
    FormsModule,
    //FlexLayoutModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatTableModule,
    MatCheckboxModule, MatPaginatorModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSortModule,
    // Ng2SearchPipeModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-right'
    })
    // RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
