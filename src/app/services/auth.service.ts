import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  
  private url = 'http://localhost:3000';

  loggedIn = false;
  isPatient = false;
  isAdmin = false;
  isDoctor = false;
  isLabAdmin = false;
  isLabAssist = false;
  isPharmacist = false;
  isPharmAdmin = false;
  isHospitalAdmin = false;
  currentUser: any = {};

  jwtHelper: JwtHelper = new JwtHelper();
  
  constructor(private http: HttpClient,private route: Router) {
    const token = localStorage.getItem('token');
      if (token) {
        const decodedUser = this.decodeUserFromToken(token);
        this.setCurrentUser(decodedUser);
      }
  }

  login(credentials): Observable<any>{
    return this.http.post<any>('http://localhost:3000/login',credentials).pipe(map(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        return this.loggedIn;
      }))
  }
 
  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.isHospitalAdmin = false;
    this.isLabAdmin = false;
    this.isPharmAdmin = false;
    this.isDoctor = false;
    this.isPharmacist = false;
    this.isLabAssist = false;
    this.isPatient = false;
    this.route.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === 'Admin' ? this.isAdmin = true : this.isAdmin = false;
    decodedUser.role === 'Hospital' ? this.isHospitalAdmin = true : this.isHospitalAdmin = false;
    decodedUser.role === 'Lab' ? this.isLabAdmin = true : this.isLabAdmin = false;
    decodedUser.role === 'LabAssist' ? this.isLabAssist = true : this.isLabAssist = false;
    decodedUser.role === 'Pharm' ? this.isPharmAdmin = true : this.isPharmAdmin = false;
    decodedUser.role === 'Pharmacist' ? this.isPharmacist = true : this.isPharmacist = false;
    decodedUser.role === 'Doctor' ? this.isDoctor = true : this.isDoctor = false;
    decodedUser.role === 'Patient' ? this.isPatient = true : this.isPatient = false;
    delete decodedUser.role;
  }
  
  register(user): Observable<any> {
    return this.http.post<any>(this.url+'/register',user)
  }

  getProfile(): Observable<any>{
    return this.http.get<any>(this.url+'/profile')
  }

  getToken(){
    return localStorage.getItem('token')
  }


}
