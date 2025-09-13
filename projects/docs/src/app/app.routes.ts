import { Routes } from '@angular/router';
import { docsRoutes } from './features/docs/docs.routes';

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
    path: 'docs',
    loadComponent: () =>
      import('./features/docs/docs').then(c => c.Documentation),
    children: docsRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
