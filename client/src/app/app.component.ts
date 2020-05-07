import { Component, ViewEncapsulation } from '@angular/core';
import {AuthenticationService} from './authentication.service'
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(public auth: AuthenticationService) {}
}
