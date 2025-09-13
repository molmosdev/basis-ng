import { Routes } from '@angular/router';
import { componentsRoutes } from './pages/components/components.routes';
import { utilitiesRoutes } from './pages/utilities/utilities.routes';

export const docsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'introduction',
    pathMatch: 'full',
  },
  {
    path: 'introduction',
    loadComponent: () =>
      import('./pages/introduction').then(c => c.Introduction),
    title: 'Introduction - Basis UI',
    data: {
      title: 'Introduction',
    },
  },
  {
    path: 'installation',
    loadComponent: () =>
      import('./pages/installation').then(c => c.Installation),
    title: 'Installation - Basis UI',
    data: {
      title: 'Installation',
    },
  },
  {
    path: 'theming',
    loadComponent: () => import('./pages/theming').then(c => c.Theming),
    title: 'Theming - Basis UI',
    data: {
      title: 'Theming',
      new: true,
    },
  },
  {
    path: 'components',
    children: componentsRoutes,
  },
  {
    path: 'utilities',
    children: utilitiesRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
