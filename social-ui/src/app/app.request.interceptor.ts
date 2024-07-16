import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from './models';

export const XhrInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  let user: User | null = null;
  if (sessionStorage.getItem('userdetails')) {
    user = JSON.parse(sessionStorage.getItem('userdetails')!);
  }

  const router = inject(Router);
  let httpHeaders = new HttpHeaders();
  if (user && user.password && user.username) {
    httpHeaders = httpHeaders.append(
      'Authorization',
      'Basic ' + window.btoa(user.username + ':' + user.password)
    );
  }

  const token = sessionStorage.getItem('access_token');
  if (token) {
    httpHeaders.append('Authorization', `Bearer ${token}`);
  }

  // if (xsrf) {
  //   httpHeaders = httpHeaders.append('X-XSRF-TOKEN', xsrf);
  // }

  httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
  const xhr = req.clone({
    headers: httpHeaders,
  });

  return next(xhr).pipe(
    tap({
      error: (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          router.navigate(['error']); // TODO
        }
      },
    })
  );
};
