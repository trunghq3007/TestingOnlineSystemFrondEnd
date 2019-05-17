import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewListQuestionComponent } from './view-list-question/view-list-question.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';

// const routes: Routes = [];

const routes: Routes = [
  {
    path: 'ViewListQuestion',
    component: ViewListQuestionComponent
  },
  {
    path: 'CreateQuestion',
    component: CreateQuestionComponent
  },
  {
    path: 'EditQuestion/:Id',
    component: EditQuestionComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
