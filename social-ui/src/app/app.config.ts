import {
  APP_INITIALIZER,
  ApplicationConfig,
  Provider,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import {
  KeycloakAngularModule,
  KeycloakBearerInterceptor,
  KeycloakService,
} from 'keycloak-angular';


  function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:8081/',
          realm: 'chatappdev',
          clientId: 'chatapppublic',
        },
        initOptions: {
          // onLoad: 'login-required', // Action to take on load
          pkceMethod: 'S256',
          redirectUri: 'http://localhost:4200/chat', // TODO: home
          // silentCheckSsoRedirectUri:
          //   window.location.origin + '/assets/silent-check-sso.html', // URI for silent SSO checks
        },
        enableBearerInterceptor: true,
        bearerPrefix: 'Bearer',
      });
  }

// Provider for Keycloak Bearer Interceptor
const KeycloakBearerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    KeycloakAngularModule,
    KeycloakBearerInterceptorProvider,
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
};
