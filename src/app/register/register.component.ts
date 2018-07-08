import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'
import { ToastService } from '../services/toast.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  roles = ['Admin','Doctor','Hospital','Lab','Patient','Pharm','Pharmacist','LabAssist'];

  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  role = new FormControl('', [
    Validators.required
  ]);

  constructor(private fb: FormBuilder,
              private userService:AuthService,
              public toast:ToastService,
              private router: Router) {

  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: this.username,
      password: this.password,
      role: this.role
    });
  }
  
  register() {
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.open('Thanks to Register','success',''+this.registerForm.get('username').value);
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 1800);
      },
      error => this.toast.open('Failed to','Register', 'danger')
    );
  }
}
