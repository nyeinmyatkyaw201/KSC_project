import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css']
})
export class WelcomepageComponent {
  	constructor(private api: ApiService,private router:Router){
 
    }
    gotoRegistar(){
      this.router.navigateByUrl('registration')
    }
}
