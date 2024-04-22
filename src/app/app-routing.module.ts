import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MembersetupComponent } from './membersetup/membersetup.component';
import { RegistractionMemberComponent } from './registraction-member/registraction-member.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { RegistrationBComponent } from './registration-b/registration-b.component';
import { UploadComponent } from './upload/upload.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'welcome', component: WelcomepageComponent },
  {
    path: 'membersetup',
    component: MembersetupComponent,
    
  },
  {
    path: 'registration',
    component: RegistractionMemberComponent,
    
  },
  {
    path: "registration/:id",
    component: RegistrationBComponent
  },
  {
    path: "upload",
    component : UploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
