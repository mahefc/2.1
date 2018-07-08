import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mobileQuery: MediaQueryList;

  clicked:boolean = false;

  private _mobileQueryListener: () => void;

  user:any={};

  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private auth: AuthService,
    private router: Router,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  onLogoutClick() {
    this.auth.logout(); 
    this.router.navigate(['/']); 
  }


  ngOnInit() {
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
 
  
}
