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
import { ViewListSemasterComponent } from './view-list-semaster/view-list-semaster.component';
// import { CreateQuestionComponent } from './create-question/create-question.component';
import { Router, Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatTable } from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TesstformComponent } from './tesstform/tesstform.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ViewListSemastertotestComponent } from './view-list-semastertotest/view-list-semastertotest.component';
import { ViewlistTestbySemesterComponent } from './viewlist-testby-semester/viewlist-testby-semester.component';
import { ManagerSemesterExamReportComponent } from './manager-semester-exam-report/manager-semester-exam-report.component';
import { ManagerSemesterExamExamsComponent } from './manager-semester-exam-exams/manager-semester-exam-exams.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { ChartsModule } from 'ng2-charts';
import { SemesterDetailComponent } from './semester-detail/semester-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material';
import {MatTabsModule} from '@angular/material';
import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { ObjectResultComponent } from './object-result/object-result.component';
import { AddCandidatesComponent } from './add-candidates/add-candidates.component';

const routes: Routes = [{
  path: 'SemesterExam',
  children: [{
    path: '',
    component: ViewListSemasterComponent,
    pathMatch: 'full'
  }]
}];
@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    AppsettingComponent,
    DashboardComponent,
    ViewListQuestionComponent,
    ViewListSemasterComponent,
    TesstformComponent,
    ViewListSemastertotestComponent,
    ViewlistTestbySemesterComponent,
    ManagerSemesterExamReportComponent,
    ManagerSemesterExamExamsComponent,
    CandidatesComponent,
    SemesterDetailComponent,
    ObjectResultComponent,
    AddCandidatesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule, BrowserAnimationsModule, MatTableModule, MatFormFieldModule,MatListModule,
    MatPaginatorModule, MatCheckboxModule, MatSortModule, MatSelectModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonModule, RouterModule.forRoot(routes), MatDialogModule,MatTabsModule,
    FormsModule, ReactiveFormsModule, MatIconModule, MatExpansionModule,ChartsModule,MatFormFieldModule,MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
