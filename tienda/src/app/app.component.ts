import { Component } from '@angular/core';
import {AppService} from "@common/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    public appService: AppService
  ) {

  }
}
