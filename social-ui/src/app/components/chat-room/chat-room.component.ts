import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `
    <ng-container>
      <div class="room">
        <div class="user-icons">
          <!-- TODO: component -->
          <div class="user-icon">U1</div>
          <div class="user-icon">U2</div>
          <div class="user-icon">U3</div>
        </div>
        <div class="chat-window">
          <!-- TODO: component -->
          <div class="message">Hello, this is a message.</div> 
          <div class="message">Another message here.</div>
        </div>
      </div>
      <span class="auth-user">
        {{ userService.user$ | async | json }}
      </span>
    </ng-container>
  `,
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent {
  constructor(public readonly userService: UserService) {
  }
}
