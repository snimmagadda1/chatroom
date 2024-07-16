import { CanActivateFn } from '@angular/router';

// TODO
export const AuthGuard: CanActivateFn = (route, state) => {
  const isAuth = sessionStorage.getItem('access_token');
  if (isAuth) {
    return true;
  } else {
    // _oauthRedirect();
    return true;
  }
};


const _oauthRedirect = () => {
  // Angular (TypeScript) example
  const clientId = 'Ov23liytyNjV7JiWisEQ';
  const redirectUri = 'http://localhost:4200/callback';
  const scope = 'read:user';
  const state = 'random_string_for_csrf_protection';

  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
}