import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class ToastService {

  constructor(public snackBar: MatSnackBar) { }

  open(message: string, cssClass: string,msg:string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = [cssClass];
    this.snackBar.open(message,msg, config);
  }

}

