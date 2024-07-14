import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  validateLoginDetails(user: User) {
    window.sessionStorage.setItem('userdetails', JSON.stringify(user));
    return this.http.get("http://localhost:8080" + "/user", {
      observe: 'response',
      withCredentials: true,
    });
  }
}
