import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'social-ui';

  constructor() {
    const testUser = 'sai@example.com';
    const testPass = '12345';
    window.sessionStorage.setItem(
      'userdetails',
      JSON.stringify({ username: testUser, password: testPass })
    );
  }
}
