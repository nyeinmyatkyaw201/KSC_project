import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MembersetupComponent } from './membersetup/membersetup.component';
import { RegistractionMemberComponent } from './registraction-member/registraction-member.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { RegistrationBComponent } from './registration-b/registration-b.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MembersetupComponent,
    RegistractionMemberComponent,
    WelcomepageComponent,
    RegistrationBComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
