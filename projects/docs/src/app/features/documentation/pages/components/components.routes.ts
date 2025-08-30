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
    path: 'drawer',
    loadComponent: () => import('./pages/drawer-documentation.component'),
    title: 'Drawer - Basis UI',
    data: {
      title: 'Drawer',
    },
  },
  {
    path: 'sheet',
    loadComponent: () => import('./pages/sheet-documentation.component'),
    title: 'Sheet - Basis UI',
    data: {
      title: 'Sheet',
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
    path: 'dialog',
    loadComponent: () => import('./pages/dialog-documentation.component'),
    title: 'Dialog - Basis UI',
    data: {
      title: 'Dialog',
      new: true,
    },
  },
  {
    path: 'card',
    loadComponent: () => import('./pages/card-documentation.component'),
    title: 'Card - Basis UI',
    data: {
      title: 'Card',
      new: true,
    },
  },
  {
    path: 'otp',
    loadComponent: () => import('./pages/otp-documentation.component'),
    title: 'OTP - Basis UI',
    data: {
      title: 'OTP',
      new: true,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
