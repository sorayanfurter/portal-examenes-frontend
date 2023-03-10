import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { AddExamComponent } from './pages/admin/add-exam/add-exam.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateExamComponent } from './pages/admin/update-exam/update-exam.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewExamsComponent } from './pages/admin/view-exams/view-exams.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadExamComponent } from './pages/user/load-exam/load-exam.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    pathMatch:'full'
  },
  {
    path:'signup',
    component: SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children:[
      {
        path:'profile',
        component: ProfileComponent
      },
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path:'categorias',
        component: ViewCategoriesComponent
      },
      {
        path: 'add-categoria',
        component: AddCategoriesComponent
      },
      {
        path: 'examenes',
        component: ViewExamsComponent
      },
      {
        path: 'add-examen',
        component: AddExamComponent
      },
      {
        path: 'examen/:examenId',
        component: UpdateExamComponent
      },
      {
        path: 'ver-preguntas/:examenId/:titulo',
        component: ViewQuestionsComponent
      },
      {
        path: 'add-pregunta/:examenId/:titulo',
        component: AddQuestionComponent
      },
      {
        path: 'pregunta/:preguntaId',
        component: UpdateQuestionComponent
      }
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children:[
      {
        path: ':catId',
        component: LoadExamComponent
      },
      {
        path: 'instrucciones/:examenId',
        component: InstructionsComponent
      },
    ]
  },
  {
    path: 'start/:examenId',
    component: StartComponent,
    canActivate:[NormalGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
