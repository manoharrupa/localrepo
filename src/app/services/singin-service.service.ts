import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class signinServiceService {

  private baseUrl = environment.backendBaseUrl;
  constructor(private http: HttpClient){

  }

 

  login(data: any){
     return this.http.post(`${this.baseUrl}/user/login`,data);

  }

 
}
