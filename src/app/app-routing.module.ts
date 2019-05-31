import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComponent } from './group/group.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { UserGroupAddComponent } from './user-group-add/user-group-add.component';
import { UserComponent } from './user/user.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ViewListQuestionComponent } from './view-list-question/view-list-question.component';
import { TagsComponent } from './tags/tags.component';
import { CategoryComponent } from './category/category.component';
import { ImportQuestionComponent } from './import-question/import-question.component';
import { ExportQuestionComponent } from './export-question/export-question.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { DetailQuestionComponent } from './detail-question/detail-question.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'question',
    component: ViewListQuestionComponent,
  },
  {
    path: 'tag',
    component: TagsComponent,
  },
  {
    path: 'ImportQuestion',
    component: ImportQuestionComponent,
  },
  {
    path: 'ExportQuestion',
    component: ExportQuestionComponent,
  },
  {
    path: 'CreateQuestion',
    component: CreateQuestionComponent,
  },
  {
    path: 'DetailQuestion/:Id',
    component: DetailQuestionComponent,
  },
  {
    path: 'EditQuestion/:Id',
    component: EditQuestionComponent,
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'success',
    component: GroupComponent
  },
  {
    path: 'user',
    children: [{
      path: '',
      component: UserComponent,
    },
    {
      path: 'create',
      component: UserCreateComponent
    },
    // {
    //   path: ':UserId',
    //   component: UserDetailComponent
    // },
    {
      path: 'update/:Id',
      component: UserUpdateComponent
    }
    ]
  },
  {
    path: 'group',
    children: [
      {
        path: '',
        component: GroupComponent,
        // pathMatch: 'full'
      },
      {
        path: ':groupId',
        component: GroupDetailComponent
      },
      {
        path: 'usergroup',
        children: [
          {
            path: '',
            component: GroupComponent,
            // pathMatch: 'full'
          },
          {
            path: ':groupId',
            component: UserGroupComponent
          },
          {
            path: 'usergroupadd/:groupId',
            component: UserGroupAddComponent
          }
        ]
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
