import { Component,OnInit,ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource,MatSort } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  private users:any;
  public roles;

  displayedColumns = ['username','role','actions'];
  dataSource=  new MatTableDataSource(this.dataSource);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  addData:boolean = false;

  addForm: FormGroup;

  role = new FormControl('', [
    Validators.required
  ]);
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  phone = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.pattern('[0-9\\s]*')
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  constructor(private service:UserService,
              private auth:AuthService,
              private fb: FormBuilder) {
    this.addForm = this.fb.group({
      role:this.role,
      username: this.username,
      phone: this.phone,
      password:this.password
    });
  }

  ngOnInit() {
    if(this.auth.currentUser.role=='Admin'){
      this.roles = ['Admin','Doctor','Hospital','Lab','Patient','Pharm'];
    }
    else if(this.auth.currentUser.role=='Hospital'){
      this.roles = ['Doctor','Lab','Patient','Pharm'];
    }
    else if(this.auth.currentUser.role=='Pharm'){
      this.roles = ['Pharmacist'];
    }
    else if(this.auth.currentUser.role=='Lab'){
      this.roles = ['LabAssist'];
    }
    this.service.getAll().subscribe(
      res=>{
        this.users=res;
        this.dataSource=new MatTableDataSource(this.users);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      })
  }

  add(){
    this.service.create(this.addForm.value).subscribe(
      res=>{
       this.users.push(res)
       this.dataSource=new MatTableDataSource(this.users);
       this.dataSource.sort=this.sort;
       this.dataSource.paginator=this.paginator;
       console.log('Data inserted') 
       this.addForm.reset();
       this.addData = false;
       this.ngOnInit();
      }
    )
  }

  delete(id){
    this.service.delete(id).subscribe(
      res =>{
         this.ngOnInit();
         console.log('Data deleted')
       })   
  }

}
