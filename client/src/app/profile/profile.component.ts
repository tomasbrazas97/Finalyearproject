import { Component } from '@angular/core'
import { AuthenticationService, UserDetails } from '../authentication.service'
import { Router } from '@angular/router';
import { ChatService } from './chat.service'

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[ChatService]
})
export class ProfileComponent {
  details: UserDetails
  
  user: String;
  room: String;

  constructor(private auth: AuthenticationService, private router: Router, private _chatService: ChatService ) {}

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
      },
      err => {
        console.error(err)
      }
    )
  }

  toChat() {
    this.router.navigateByUrl('/chat');
  }

  join(){
    this._chatService.joinRoom({user:this.user, room:this.room});
  }
}