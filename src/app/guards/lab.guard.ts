import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthLab implements CanActivate {

  constructor(public auth: AuthService, private router: Router) {}

  canActivate() {
    return this.auth.isLabAdmin;
  }

}

