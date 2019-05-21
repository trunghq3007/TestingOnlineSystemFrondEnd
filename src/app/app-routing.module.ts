import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewListQuestionComponent } from './view-list-question/view-list-question.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { DetailQuestionComponent } from './detail-question/detail-question.component';
import { ImportQuestionComponent } from './import-question/import-question.component';
import { ExportQuestionComponent } from './export-question/export-question.component';
import { TagsComponent } from './tags/tags.component';
import { CategoryComponent } from './category/category.component';

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
  },
  {
    path: 'DetailQuestion/:Id',
    component: DetailQuestionComponent
  },
  {
    path: 'ImportQuestion',
    component: ImportQuestionComponent
  },
  {
    path: 'ExportQuestion',
    component: ExportQuestionComponent
  },
  {
    path: 'Tags',
    component: TagsComponent
  },
  {
    path: 'Categorys',
    component: CategoryComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
