import { Routes } from '@angular/router';
import { documentationRoutes } from './features/documentation/documentation.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home.component'),
    title: 'Basis UI',
  },
  {
    path: 'documentation',
    loadComponent: () =>
      import('./features/documentation/documentation.component'),
    children: documentationRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
