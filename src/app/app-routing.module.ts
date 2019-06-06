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
import { ViewListSemasterComponent } from './view-list-semaster/view-list-semaster.component';
import { SemesterDetailComponent } from './semester-detail/semester-detail.component';
import { ManagerSemesterExamTestComponent } from './manager-semester-exam-test/manager-semester-exam-test.component';
import { ViewListSemastertotestComponent } from './view-list-semastertotest/view-list-semastertotest.component';
import { ViewlistTestbySemesterComponent } from './viewlist-testby-semester/viewlist-testby-semester.component';
import { ThiChitietbaithiComponent } from './thi-chitietbaithi/thi-chitietbaithi.component';
import { ThiThiComponent } from './thi-thi/thi-thi.component';

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
    path: 'importquestion',
    component: ImportQuestionComponent,
  },
  {
    path: 'exportquestion',
    component: ExportQuestionComponent,
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
  }
  ,
  {
    path: 'SemesterExamManager',

    children:
      [
        {
          path: '',
          component: ViewListSemasterComponent,
          pathMatch: 'full'
        }
        ,

        {
          path: 'detail/:Id',
          children:
            [
              // {
              //   path: ':Id',
              //   component: SemesterDetailComponent
              // }
              // ,
              {
                path: 'test',
                component: ManagerSemesterExamTestComponent

              }
            ]

        },

      ]
  }
  ,
  {
    path: 'thi',

    children:
      [
        {
          path: '',
          component: ViewListSemastertotestComponent,



        }
        ,
        {
          path: ':Id',

          children:
            [
              {
                path: '',
                component: ViewlistTestbySemesterComponent,
              }
              ,
              {
                path: ':TestId',
                
                children :
                [
                  {
                    path : '',
                    component: ThiChitietbaithiComponent,
                  }
                  ,
                  {
                    path: 'thi',
                    component: ThiThiComponent
                  }
                ]
              }
            ]
        }
      ]


  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
