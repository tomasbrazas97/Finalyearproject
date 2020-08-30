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
  messageArray: Array<{user:String, message:String}> = [];

  constructor(private auth: AuthenticationService, private router: Router, private _chatService: ChatService ) {
    this._chatService.newUserJoined()
    .subscribe(data=>this.messageArray.push(data));

    this._chatService.userLeftRoom()
    .subscribe(data=>this.messageArray.push(data));
  }

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

  leave(){
    this._chatService.leaveRoom({user:this.user, room:this.room});
  }
}