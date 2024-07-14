import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: ` <p>logout works!</p> `,
  styleUrl: './logout.component.scss',
})
export class LogoutComponent implements OnInit{
  model: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    window.sessionStorage.setItem('userdetails', '');
    // window.sessionStorage.setItem('XSRF-TOKEN', ''); // TODO
    this.router.navigate(['/login']);
  }
}
