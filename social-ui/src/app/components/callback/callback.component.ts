import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <p>Callback component!</p>
  `,
  styleUrl: './callback.component.scss',
})
export class CallbackComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
      console.warn('CALLBACK LOGIC HAPPENS HERE');
  }
}
