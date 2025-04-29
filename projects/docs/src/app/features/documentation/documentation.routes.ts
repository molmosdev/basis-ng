import { Routes } from '@angular/router';
import { componentsRoutes } from './pages/components/components.routes';

export const documentationRoutes: Routes = [
  {
    path: '',
    redirectTo: 'introduction',
    pathMatch: 'full',
  },
  {
    path: 'introduction',
    loadComponent: () => import('./pages/introduction/introduction.component'),
    title: 'Introduction - Basis UI',
    data: {
      title: 'Introduction',
    },
  },
  {
    path: 'theming',
    loadComponent: () => import('./pages/theming/theming.component'),
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
    path: '**',
    redirectTo: '',
  },
];
