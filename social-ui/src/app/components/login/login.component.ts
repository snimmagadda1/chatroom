import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          class="form-control"
          name="username"
          ngModel
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          name="password"
          ngModel
          required
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        [disabled]="!loginForm.valid"
      >
        Login
      </button>
    </form>
  `,
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  model: any;
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(formData: NgForm) {
    this.authService.validateLoginDetails(formData.value).subscribe((res) => {
        this.model = <any>res.body;

        this.model.authStatus = 'AUTH';
        window.sessionStorage.setItem(
          'userdetails',
          JSON.stringify(this.model)
        );

      this.router.navigate(['chat']);
      // window.sessionStorage.setItem(
      //   'Authorization',
      //   res.headers.get('Authorization')!
      // );
    });
  }
}
