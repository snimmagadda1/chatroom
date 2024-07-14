import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [],
  template: `
    <div class="room">
      <div class="user-icons">
        <div class="user-icon">U1</div>
        <div class="user-icon">U2</div>
        <div class="user-icon">U3</div>
      </div>
      <div class="chat-window">
        <div class="message">Hello, this is a message.</div>
        <div class="message">Another message here.</div>
      </div>
    </div>
  `,
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent {}
