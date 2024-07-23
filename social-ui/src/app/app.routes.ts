import { Routes } from '@angular/router';
import { ChatRoomComponent, ErrorComponent, LogoutComponent } from './components';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  // TODO: login w/ oauth auth provider (github)
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: 'error', component: ErrorComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'chat',
    component: ChatRoomComponent,
    canActivate: [AuthGuard],
  },
];
