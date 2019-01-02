import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Injectable()
export class SnackService {

  private snackBarOptions: MatSnackBarConfig = new MatSnackBarConfig;

  constructor(
    private snackBar: MatSnackBar
  ) { }

  launch(message: string, action: string, duration: number) {
    this.snackBarOptions.duration = duration;
    this.snackBar.open(message, action, this.snackBarOptions);
  }
}
