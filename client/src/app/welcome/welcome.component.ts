import { Component } from '@angular/core'
import { Router } from '@angular/router'


@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})

export class WelcomeComponent{
    constructor(private router: Router) { }

    toRegister() {
        this.router.navigateByUrl('/login');
    }

}