import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private api: ApiService , private router:Router) {}

  visible: boolean = false;
  userid: string = '';
  password: string = '';
  errormessage: string = '';

  viewPass() {
    this.visible = !this.visible;
    setTimeout(() => {
      this.visible = false;
    }, 500);
  }
  async login() {
    const data = {
      userid: this.userid,
      password: this.password,
    };
    await this.api.login(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigateByUrl('membersetup')
      },
      error: (err: any) => {
        this.errormessage = err.error.message;
        setTimeout(() => {
          this.errormessage = '';
        }, 1500);
      },
    });
  }
}
