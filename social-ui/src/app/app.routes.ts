import { Routes } from '@angular/router';
import { CallbackComponent, ChatRoomComponent, LogoutComponent } from './components';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  // TODO: login w/ oauth auth provider (github)
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: 'callback', component: CallbackComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'chat', component: ChatRoomComponent, canActivate: [AuthGuard] },
];
