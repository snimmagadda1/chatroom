import { CanActivateFn } from '@angular/router';
import { UserService } from './services';
import { inject } from '@angular/core';
import { map, pipe } from 'rxjs';

// TODO
export const AuthGuard: CanActivateFn = (route, state) => {
  const isAuth = sessionStorage.getItem('userdetails') !== null;
  const userService = inject(UserService);
  if (isAuth) {
    return userService.fetchUser$().pipe(
      map(user => user != null ? true: false)
    );
  }
  return false;
};
