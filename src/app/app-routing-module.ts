import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { User } from './user/user';
import { AuthGuard } from '../guards/auth-guard';
import { LoginGuard } from '../guards/login-guard';
import { Applayout } from './components/applayout/applayout';
import { Sports } from './components/sports/sports';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },

  {
    path: '',
    component: Applayout,
    canActivate: [AuthGuard],
    children: [
      { path: 'user', component: User },
      { path: 'sports', component: Sports },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
