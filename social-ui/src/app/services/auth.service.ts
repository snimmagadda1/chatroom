import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly CLIENT_ID = 'Ov23liytyNjV7JiWisEQ';
  constructor(private http: HttpClient) {}

  checkCredentials(): any {
    const isAuth = sessionStorage.getItem('access_token');
    return isAuth != null;
  }

  retrieveToken(code: string) {
    let params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', this.CLIENT_ID);
    params.append('redirect_uri', "http://localhost:4200/callback");
    params.append('code', code);

    let headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    });

    this.http
      .post<{ access_token: string }>(
        'http://localhost:8080/auth/token',
        { code },
        { headers: headers }
      )
      .subscribe(
        (data) => {
          sessionStorage.setItem('access_token', data.access_token);
          console.error('GOT SHIT', data);
        },
        (err) => alert('Invalid Credentials')
      );
  }

  // validateLoginDetails(user: User) {
  //   window.sessionStorage.setItem('userdetails', JSON.stringify(user));
  //   return this.http.get("http://localhost:8080" + "/user", {
  //     observe: 'response',
  //     withCredentials: true,
  //   });
  // }
}
