import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuth = sessionStorage.getItem('userdetails');
  if (isAuth) {
    return true;
  } else {
    router.navigate(['/login']); // Redirect to login page if not authenticated
    return false;
  }
};
