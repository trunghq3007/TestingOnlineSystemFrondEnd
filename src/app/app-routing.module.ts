import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewListSemasterComponent } from './view-list-semaster/view-list-semaster.component';
import { ManagerSemesterExamReportComponent } from './manager-semester-exam-report/manager-semester-exam-report.component';
import { ManagerSemesterExamExamsComponent } from './manager-semester-exam-exams/manager-semester-exam-exams.component';
import { SemesterDetailComponent } from './semester-detail/semester-detail.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { addToViewTree } from '@angular/core/src/render3/instructions';
import { AddCandidatesComponent } from './add-candidates/add-candidates.component';
// import { AddCandidatesComponent } from './add-candidates/add-candidates.component';
const routes: Routes = [
  {
    path: 'SemesterExamManager',
    children: [
      {
        path: '',
        component: ViewListSemasterComponent,
        pathMatch: 'full'
      },
      {
        path: 'Report/:Id',
        component: ManagerSemesterExamReportComponent,
      },
      {
        path: 'exams/:Id',
        component: ManagerSemesterExamExamsComponent
      },
      {
        path: 'Thisinh/:Id',
        component: CandidatesComponent,
        
          

      },
      {
          path :'ThemThisinh/:Id',
          component:AddCandidatesComponent,
      },
      {
        path: 'detail/:Id',
        component: SemesterDetailComponent
      }]
  }

    
]

// {
//   path:'test',
//   children: [
//     {
//       path: '',
//       component: ListTestComponent,
//       pathMatch: 'full'
//     },
//     {
//       path: 'create',
//       component: ListCreateComponent
//     },
//     {
//       path: ':testID',
//       component: ListDetailComponent
//     },
//     {
//       path: 'update/:Id',
//       component: ListDetailComponent
//     }
//   ]
// }




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
