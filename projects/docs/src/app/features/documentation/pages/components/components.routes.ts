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
    title: 'Button - Basis UI',
    data: {
      title: 'Button',
    },
  },
  {
    path: 'input',
    loadComponent: () => import('./pages/input-documentation.component'),
    title: 'Input - Basis UI',
    data: {
      title: 'Input',
    },
  },
  {
    path: 'select',
    loadComponent: () => import('./pages/select-documentation.component'),
    title: 'Select - Basis UI',
    data: {
      title: 'Select',
    },
  },
  {
    path: 'combobox',
    loadComponent: () => import('./pages/combobox-documentation.component'),
    title: 'Combobox - Basis UI',
    data: {
      title: 'Combobox',
      new: true,
    },
  },
  {
    path: 'switch',
    loadComponent: () => import('./pages/switch-documentation.component'),
    title: 'Switch - Basis UI',
    data: {
      title: 'Switch',
    },
  },
  {
    path: 'badge',
    loadComponent: () => import('./pages/badge-documentation.component'),
    title: 'Badge - Basis UI',
    data: {
      title: 'Badge',
    },
  },
  {
    path: 'checkbox',
    loadComponent: () => import('./pages/checkbox-documentation.component'),
    title: 'Checkbox - Basis UI',
    data: {
      title: 'Checkbox',
    },
  },
  {
    path: 'textarea',
    loadComponent: () => import('./pages/textarea-documentation.component'),
    title: 'Textarea - Basis UI',
    data: {
      title: 'Textarea',
    },
  },
  {
    path: 'tooltip',
    loadComponent: () => import('./pages/tooltip-documentation.component'),
    title: 'Tooltip - Basis UI',
    data: {
      title: 'Tooltip',
      new: true,
    },
  },
  {
    path: 'bottom-sheet',
    loadComponent: () => import('./pages/bottom-sheet-documentation.component'),
    title: 'Bottom Sheet - Basis UI',
    data: {
      title: 'Bottom Sheet',
    },
  },
  {
    path: 'side-sheet',
    loadComponent: () => import('./pages/side-sheet-documentation.component'),
    title: 'Side Sheet - Basis UI',
    data: {
      title: 'Side Sheet',
    },
  },
  {
    path: 'color-picker',
    loadComponent: () => import('./pages/color-picker-documentation.component'),
    title: 'Color Picker - Basis UI',
    data: {
      title: 'Color Picker',
    },
  },
  {
    path: 'range',
    loadComponent: () => import('./pages/range-documentation.component'),
    title: 'Range - Basis UI',
    data: {
      title: 'Range',
    },
  },
  {
    path: 'tree',
    loadComponent: () => import('./pages/tree-documentation.component'),
    title: 'Tree - Basis UI',
    data: {
      title: 'Tree',
      new: true,
    },
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu-documentation.component'),
    title: 'Menu - Basis UI',
    data: {
      title: 'Menu',
      new: true,
    },
  },
  {
    path: 'alert',
    loadComponent: () => import('./pages/alert-documentation.component'),
    title: 'Alert - Basis UI',
    data: {
      title: 'Alert',
    },
  },
  {
    path: 'command',
    loadComponent: () => import('./pages/command-documentation.component'),
    title: 'Command - Basis UI',
    data: {
      title: 'Command',
      new: true,
    },
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs-documentation.component'),
    title: 'Tabs - Basis UI',
    data: {
      title: 'Tabs',
      new: true,
    },
  },
  {
    path: 'input-group',
    loadComponent: () => import('./pages/input-group-documentation.component'),
    title: 'Input Group - Basis UI',
    data: {
      title: 'Input Group',
      new: true,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
