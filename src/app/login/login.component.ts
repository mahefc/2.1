import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  username = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  constructor(private fb: FormBuilder,
              private router: Router,
              public toast:ToastService,
              private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.loggedIn) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.fb.group({
      username: this.username,
      password: this.password,
    });
  }

  login(){
    this.auth.login(this.loginForm.value).subscribe(
      res =>
      {
        this.toast.open('Welcome back user','success',''+this.loginForm.get('username').value);
        this.router.navigate(['/dashboard'])
      },
      error => this.toast.open('Username or password is', 'danger','Invalid')
    );
  }

}