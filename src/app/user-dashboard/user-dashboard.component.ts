import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../services/http.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{
  
  displayedColumns: string[] = ['user_id','user_name','user_email','user_phone_no','user_pwd','user_gender','user_reg_date','action'];
  dataSource!: MatTableDataSource<any> ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private http:HttpService,private dialog:MatDialog){

  }

  ngOnInit(): void {
   this.getUserList();
  }

  getUserList(){
    this.http.getDataFromServer('').subscribe((response:any)=>{
      if(response && response.status == 1 && response.data.length > 0){
         this.dataSource = new MatTableDataSource(response.data);
         this.dataSource.paginator = this.paginator ;
         this.dataSource.sort  = this.sort;
      }
    },
    error=>{

    })
  }

  onEdit(rowData:any){
    console.log(rowData);
    let config = new MatDialogConfig();
    config.width = "800px";
    config.data = 
       {
       'action':"EDIT", 
       'rowData': rowData
      }; 
    // config.panelClass = "modal";
  const dialogRef =  this.dialog.open(SignUpComponent,config);
  dialogRef.afterClosed().subscribe((el:any)=>{
    console.log("data received from dialog",el);
    let selectIndex = this.dataSource.data.findIndex(el=> el.user_id === rowData.user_id);
    // this.dataSource.data[selectIndex]  = el.data ;

    this.dataSource.data[selectIndex].user_email = el.data.user_email;
    this.dataSource.data[selectIndex].user_name = el.data.user_name;
    this.dataSource.data[selectIndex].user_gender = el.data.user_gender;
    this.dataSource.data[selectIndex].user_phone_no = el.data.user_contact_no;
    this.dataSource.data[selectIndex].user_pwd = el.data.user_password;
    // this.dataSource.data[selectIndex].user_phone_no = el.data.user_contact_no;
   

    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator ;
     this.dataSource.sort  = this.sort;
    console.log("data received from dialog",this.dataSource.data);
  })
  console.log(dialogRef);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteData(row:any){
    let obj = {
      "user_id":row.user_id
    }
    this.http.deleteData('remove_user',obj).subscribe((response:any)=>{
      
    })
  }
}
