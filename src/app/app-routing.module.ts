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
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { CreateExamComponent } from './exam/create-exam/create-exam.component';
import { ExamDetailComponent } from './exam/exam-detail/exam-detail.component';
import { ExamUpdateComponent } from './exam/exam-update/exam-update.component';
import { ListTestComponent } from './test/list-test/list-test.component';
import { ListCreateComponent } from './test/list-create/list-create.component';
import { ListDetailComponent } from './test/list-detail/list-detail.component';
import { ListUpdateComponent } from './test/list-update/list-update.component';
import { ViewListSemasterComponent } from './view-list-semaster/view-list-semaster.component';
import { QuestionRouting } from './question-router';
import { ExamDetailQuestionComponent } from './exam/exam-detail-question/exam-detail-question.component';

import { SemesterDetailComponent } from './semester-detail/semester-detail.component';
import { ManagerSemesterExamTestComponent } from './manager-semester-exam-test/manager-semester-exam-test.component';
import { ViewListSemastertotestComponent } from './view-list-semastertotest/view-list-semastertotest.component';
import { ViewlistTestbySemesterComponent } from './viewlist-testby-semester/viewlist-testby-semester.component';
import { ThiChitietbaithiComponent } from './thi-chitietbaithi/thi-chitietbaithi.component';
import { ThiThiComponent } from './thi-thi/thi-thi.component';
import {RoleComponent} from './role/role.component';
import{ ThiKetquathiComponent } from './thi-ketquathi/thi-ketquathi.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'Role',
    component: RoleComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'tag',
    component: TagsComponent,
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
    {
      path: 'update/:Id',
      component: UserUpdateComponent
    },
    ]
  },
  {
    path: 'exam',
    children: [
      {
        path: '',
        component: ExamListComponent,
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: CreateExamComponent,
      },
      {
        path: ':examID',
        component: ExamDetailComponent
      },
      {
        path: 'examquestion/:examID',
        component: ExamDetailQuestionComponent
      },
      {
        path: 'update/:Id',
        component: ExamUpdateComponent
      },

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
  },
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
         
                component: SemesterDetailComponent
             

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
                  },
                  {
                    path:'ketqua',
                    component:ThiKetquathiComponent
                  }
                ]
              }
            ]
        }
      ]


  },
  {
    path: 'test',
    children: [
      {
        path: '',
        component: ListTestComponent,
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: ListCreateComponent
      },
      {
        path: ':examID',
        component: ListDetailComponent
      },
      {
        path: 'update/:Id',
        component: ListUpdateComponent
      }
    ]
  },
  {
    path: 'SemesterExamManager',
    component: ViewListSemasterComponent
  }


];

const fullRoutes = [...routes, ...QuestionRouting];
console.log(fullRoutes);
@NgModule({
  imports: [RouterModule.forRoot(fullRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }