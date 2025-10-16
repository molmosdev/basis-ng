import { Routes } from '@angular/router';

export const utilitiesRoutes: Routes = [
  {
    path: 'translation',
    loadComponent: () =>
      import('./pages/translation-documentation').then((c) => c.TranslationDocumentation),
    title: 'Translation - Basis UI',
    data: {
      title: 'Translation',
      new: true,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
