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
    loadComponent: () => import('./features/home').then(c => c.Home),
    title: 'Basis UI',
  },
  {
    path: 'get-started',
    loadComponent: () =>
      import('./features/get-started').then(c => c.GetStarted),
    title: 'Get Started - Basis UI',
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
