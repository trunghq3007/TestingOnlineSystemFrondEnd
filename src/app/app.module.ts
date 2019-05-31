import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  MatButtonModule,
  MatSortModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import { AuthenticationService } from '../app/_services/authentication.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AppfooterComponent } from './appfooter/appfooter.component';
import { AppsettingComponent } from './appsetting/appsetting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewListQuestionComponent } from './view-list-question/view-list-question.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-angular';
import { GroupComponent } from './group/group.component';

import { GroupDetailComponent } from './group-detail/group-detail.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { UserGroupAddComponent } from './user-group-add/user-group-add.component';
import { UserComponent } from './user/user.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TagsComponent } from './tags/tags.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { CreateExamComponent } from './exam/create-exam/create-exam.component';
import { ExamDetailComponent } from './exam/exam-detail/exam-detail.component';
import { ExamUpdateComponent } from './exam/exam-update/exam-update.component';
import { CategoryComponent } from './category/category.component';
import { Toast, ToastrModule } from 'ngx-toastr';
import { ListTestComponent } from './test/list-test/list-test.component';
import { ListCreateComponent } from './test/list-create/list-create.component';
import { ListDetailComponent } from './test/list-detail/list-detail.component';
import { ListUpdateComponent } from './test/list-update/list-update.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';


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
    GroupComponent,
    GroupDetailComponent,
    UserGroupComponent,
    UserGroupAddComponent,
    UserComponent,
    UserCreateComponent,
    UserUpdateComponent,
    HomeComponent,
    LoginComponent,
    ViewListQuestionComponent,
    TagsComponent,
    CategoryComponent,
    ExamListComponent,
    CreateExamComponent,
    ExamDetailComponent,
    ExamUpdateComponent,
    ListTestComponent,
    ListCreateComponent,
    ListDetailComponent,
    ListUpdateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CKEditorModule,
    MatTabsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      messageClass:'toast-message'
    }),
    NgxTrimDirectiveModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class PizzaPartyAppModule { }
