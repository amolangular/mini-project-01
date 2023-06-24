import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  errorMessage:string=""; 
  constructor(private fb:FormBuilder,private http:HttpService,private router:Router){

   }

  ngOnInit(): void {
    this.createFormStructure();
  }

  createFormStructure(){
   this.loginForm = this.fb.group({
      'user_email':this.fb.control(''),
      'user_pwd':this.fb.control(''),
    })
  }

  login(){
    let endPoint = 'login?' + 'user_email='+ this.loginForm.get('user_email')?.value + "&" + 'user_pwd='+this.loginForm.get('user_pwd')?.value;
    this.errorMessage = '';
    this.http.getDataFromServer(endPoint).subscribe(
      (response:any)=>{

         if(response && response.status === 0){
            this.errorMessage = response.message;
         }else if(response && response.status == 1){
              this.router.navigate(['/user-list']);
         }
      },
      
      ()=>{

      })
  }
}
