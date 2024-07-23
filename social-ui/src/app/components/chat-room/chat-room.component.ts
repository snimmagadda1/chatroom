import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { catchError, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, AsyncPipe, JsonPipe],
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
      <span
        class="auth-user"
        *ngIf="userService.user$ | async as user; else loading"
      >
        {{ user | json }}
      </span>
      <ng-template #loading> Loading... </ng-template>
    </ng-container>
  `,
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent {
  private subscription = new Subscription();

  constructor(public readonly userService: UserService) {
    this.subscription.add(
      this.userService.fetchUser$().subscribe((user) => {
        console.log('User:', user);
      })
    );
  }
}
