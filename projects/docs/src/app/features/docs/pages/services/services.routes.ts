import { Routes } from '@angular/router';

export const servicesRoutes: Routes = [
  {
    path: 'translation',
    loadComponent: () =>
      import('./pages/translation-documentation').then(
        c => c.TranslationDocumentation
      ),
    title: 'Translation Service - Basis UI',
    data: {
      title: 'Translation Service',
      new: true,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
