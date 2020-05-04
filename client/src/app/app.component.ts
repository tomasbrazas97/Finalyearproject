import { Component } from '@angular/core';
import {AuthenticationService} from './authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthenticationService) {}

  lat = 40.730610;
  lng = -73.935242;
}
