import { Component } from '@angular/core';
import { UserService } from '../../services';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { catchError, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, AsyncPipe, JsonPipe],
  template: `
    <div class="wrapper">
      <div class="header"></div>
      <div class="current-user">
        <p
          class="auth-user"
          *ngIf="userService.user$ | async as user; else loading"
        >
          {{ user | json }}
        </p>
        <ng-template #loading> Loading... </ng-template>
      </div>
      <div class="users">
        <!-- TODO: component -->
        <div class="user-icon">U1</div>
        <div class="user-icon icon-active">U2</div>
        <div class="user-icon">U3</div>
        <div class="user-icon">U3</div>
        <div class="user-icon">U3</div>
        <div class="user-icon">U3</div>
        <div class="user-icon">U3</div>
      </div>
      <div class="chat-window">
        <!-- TODO: component -->
        <div class="message">Hello, this is a message.</div>
        <div class="message">Another message here.</div>
      </div>
      <div class="footer"></div>
    </div>
  `,
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent {
  private subscription = new Subscription();

  constructor(
    public readonly userService: UserService,
    private readonly router: Router
  ) {
    this.subscription.add(
      this.userService
        .fetchUser$()
        .pipe(catchError((err) => this.router.navigate(['/error'])))
        .subscribe((user) => {
          console.log('User:', user);
        })
    );
  }
}
