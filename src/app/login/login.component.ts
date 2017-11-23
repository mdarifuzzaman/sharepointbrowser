import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Http } from '@angular/http';
import {Params} from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private http:Http, private route:Router) { }

  ngOnInit() {
    
    var access_token = '';
    let url = document.location.href;
    let access_token_params = url.match(/\#(?:access_token)\=([\S\s]*?)\&/);
    if(access_token_params != null && access_token_params.length > 0){
      access_token = access_token_params[1];
    }
    if(access_token != undefined && access_token != ""){
      Params.token = access_token;    
      localStorage.setItem("token", Params.token);      
    }

    if(localStorage.getItem("token") != undefined){
      this.route.navigateByUrl("/dashboard");  
    }
    
  }

  loginClicked(){
    this.authService.authentication("arif_uap@democomy.onmicrosoft.com", "Akash28121981");
  }  

}
