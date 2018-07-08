import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {

  public url = "http://localhost:3000";

  constructor( private http:HttpClient) { 

  }
  
  getAll():Observable<any>{
    return this.http.get<any>(this.url +"/admin/user")
  }

  create(data):Observable<any>{
    return this.http.post<any>(this.url +"/admin/user",data)
  }

  delete(id){
    return this.http.delete(this.url+'/admin/user/'+id,{responseType:'text'})
  }
  
  
 

}

