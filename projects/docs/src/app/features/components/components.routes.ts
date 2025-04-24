import { Routes } from '@angular/router';

export const componentsRoutes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'button',
    loadComponent: () => import('./pages/button-documentation.component'),
    data: {
      title: 'Button',
    },
  },
  {
    path: 'input',
    loadComponent: () => import('./pages/input-documentation.component'),
    data: {
      title: 'Input',
    },
  },
  {
    path: 'select',
    loadComponent: () => import('./pages/select-documentation.component'),
    data: {
      title: 'Select',
    },
  },
  {
    path: 'combobox',
    loadComponent: () => import('./pages/combobox-documentation.component'),
    data: {
      title: 'Combobox',
    },
  },
  {
    path: 'switch',
    loadComponent: () => import('./pages/switch-documentation.component'),
    data: {
      title: 'Switch',
    },
  },
  {
    path: 'badge',
    loadComponent: () => import('./pages/badge-documentation.component'),
    data: {
      title: 'Badge',
    },
  },
  {
    path: 'checkbox',
    loadComponent: () => import('./pages/checkbox-documentation.component'),
    data: {
      title: 'Checkbox',
    },
  },
  {
    path: 'textarea',
    loadComponent: () => import('./pages/textarea-documentation.component'),
    data: {
      title: 'Textarea',
    },
  },
  {
    path: 'tooltip',
    loadComponent: () => import('./pages/tooltip-documentation.component'),
    data: {
      title: 'Tooltip',
    },
  },
  {
    path: 'bottom-sheet',
    loadComponent: () => import('./pages/bottom-sheet-documentation.component'),
    data: {
      title: 'Bottom Sheet',
    },
  },
  {
    path: 'side-sheet',
    loadComponent: () => import('./pages/side-sheet-documentation.component'),
    data: {
      title: 'Side Sheet',
    },
  },
  {
    path: 'color-picker',
    loadComponent: () => import('./pages/color-picker-documentation.component'),
    data: {
      title: 'Color Picker',
    },
  },
  {
    path: 'input-group',
    loadComponent: () => import('./pages/input-group-documentation.component'),
    data: {
      title: 'Input Group',
      new: true,
    },
  },
  {
    path: 'range',
    loadComponent: () => import('./pages/range-documentation.component'),
    data: {
      title: 'Range',
      new: true,
    },
  },
  {
    path: 'tree',
    loadComponent: () => import('./pages/tree-documentation.component'),
    data: {
      title: 'Tree',
      new: true,
    },
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu-documentation.component'),
    data: {
      title: 'Menu',
      new: true,
    },
  },
  {
    path: 'alert',
    loadComponent: () => import('./pages/alert-documentation.component'),
    data: {
      title: 'Alert',
      new: true,
    },
  },
  {
    path: 'command',
    loadComponent: () => import('./pages/command-documentation.component'),
    data: {
      title: 'Command',
      new: true,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
