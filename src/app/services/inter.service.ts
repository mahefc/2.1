import { Injectable, Injector, NgModule } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserService } from '../services/user.service';
import { Authadmin } from '../guards/admin.guard';
import { Authguard } from '../guards/auth.guard';
import { AuthDoctor } from '../guards/doctor.guard';
import { AuthPatient } from '../guards/patient.guard';
import { AuthLab } from '../guards/lab.guard';
import { AuthLabAssist } from '../guards/labAssist.guard';
import { AuthHospital } from '../guards/hospital.guard';
import { AuthPharm } from '../guards/pharm.guard';
import { AuthPharmacist } from '../guards/pharmacist.guard';

@Injectable()
export class InterService implements HttpInterceptor {

    constructor(private injector: Injector){}

    intercept(req,next){
        let auth = this.injector.get(AuthService)
        if(!auth.getToken()){
            return next.handle(req)
        }
        else{
        let token = req.clone(
            {
                headers:req.headers.set('Authorization', auth.getToken())
            }
        )
        return next.handle(token)
        }
    }

}
@NgModule({
    providers: [
        Authadmin,
        Authguard,
        AuthDoctor,
        AuthPatient,
        AuthLab,
        AuthLabAssist,
        AuthHospital,
        AuthPharm,
        AuthPharmacist,
        UserService,
      { provide: HTTP_INTERCEPTORS, useClass: InterService, multi: true }
    ]
  })
  export class InterceptorModule { }