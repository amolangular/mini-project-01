import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 baseUrl:string="https://devrunner.co.in/machine_test/index.php/web_api/Users/";

 httpHeader:HttpHeaders = new HttpHeaders()
                          .set("Content-type","application/json")
  constructor(private httpClient:HttpClient) { }

  getDataFromServer(endPoint: string) {
    const url = this.baseUrl + endPoint;
    return this.httpClient.get(url);
  } 

  saveDataToServer(endPoint:string,requestBody:any){
    const url = this.baseUrl + endPoint ;
    return this.httpClient.post(url,requestBody);
  }

  updateData(endPoint:string,requestBody:any){
    const url = this.baseUrl + endPoint;
    return this.httpClient.put(url,requestBody,{headers:this.httpHeader});
  }

  deleteData(endPoint:string,requestBody:any){
    const url = this.baseUrl + endPoint;
    return this.httpClient.delete(url,{'body':requestBody});
  }
}
