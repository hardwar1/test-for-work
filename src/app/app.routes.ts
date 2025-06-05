import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: EventListComponent,
  },
  {
    path: '**',
    redirectTo: '/main',
  },
];
