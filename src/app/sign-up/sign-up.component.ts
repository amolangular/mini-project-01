import { Component, OnInit,Inject, Optional, Self } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  signupForm!:FormGroup;
  message:string=""; 
  isUpdate:boolean = false;
  constructor(private fb:FormBuilder,private http:HttpService,private dialogRef:MatDialogRef<SignUpComponent>, @Inject(MAT_DIALOG_DATA) public data:any){

   }
  ngOnInit(): void {
    console.log("data " , this.data);
    this.createFormStructure();
    if(this.data != undefined && this.data.action == "EDIT"){
      this.isUpdate = true;
      this.signupForm.patchValue(this.data.rowData);
      this.signupForm.get('user_contact_no')?.setValue(this.data.rowData.user_phone_no);
      this.signupForm.get('user_password')?.setValue(this.data.rowData.user_pwd);
    }
  
  }

  createFormStructure(){
   this.signupForm = this.fb.group({
      'user_id':this.fb.control(''), 
      'user_name':this.fb.control(''),
      'user_email':this.fb.control(''),
      'user_contact_no':this.fb.control(''),
      'user_password':this.fb.control(''),
      'user_gender':this.fb.control('')
    })
  }

  performAction(){
    if(!this.isUpdate){
      this.signUp();
    }else {
      this.updateUserData();
    }
  }

  signUp(){
    let formData = new FormData();
    formData.set('user_name',this.signupForm.get('user_name')?.value);
    formData.set('user_email',this.signupForm.get('user_email')?.value);
    formData.set('user_contact_no',this.signupForm.get('user_contact_no')?.value);
    formData.set('user_password',this.signupForm.get('user_password')?.value);
    formData.set('user_gender',this.signupForm.get('user_gender')?.value);
  
    this.message = "";
    this.http.saveDataToServer('Register',formData).subscribe(
      (response:any)=>{
        if(response && response.status === 1){
          this.message = response.message;
        }
        
      },
      (error)=>{
          
      })
  }

  updateUserData(){
    this.dialogRef.close({"data":this.signupForm.value});
    this.http.updateData('update_user',this.signupForm.value).subscribe((response:any)=>{
       console.log(response);
    },
    (error)=>{
       
    }
    )
  }

}
