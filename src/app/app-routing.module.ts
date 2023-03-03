import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { AddExamComponent } from './pages/admin/add-exam/add-exam.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateExamComponent } from './pages/admin/update-exam/update-exam.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewExamsComponent } from './pages/admin/view-exams/view-exams.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
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
      }
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate: [NormalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
