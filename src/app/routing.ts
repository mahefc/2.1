import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Authguard } from './guards/auth.guard';
import { Authadmin } from './guards/admin.guard';
import { AuthHospital } from './guards/hospital.guard';

import { UserlistComponent } from './userlist/userlist.component';

const route: Routes = [
  { path: 'home',component: HomeComponent },
  { path: 'login',component: LoginComponent },
  { path: 'register',component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [Authguard] },
  { path: 'account', component: ProfileComponent, canActivate: [Authguard] },
  { path: 'user-list', component: UserlistComponent, canActivate: [Authadmin] },
  { path: 'hospital-list', component: UserlistComponent, canActivate: [AuthHospital] },
  { path:'',redirectTo:'/home',pathMatch:'full' },
  { path: '**', redirectTo: '/home' },
];

export const RoutingModule = RouterModule.forRoot(route);
