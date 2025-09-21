import { Routes } from '@angular/router';

export const componentsRoutes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'alert',
    loadComponent: () =>
      import('./pages/alert-documentation').then(c => c.AlertDocumentation),
    title: 'Alert - Basis UI',
    data: {
      title: 'Alert',
    },
  },
  {
    path: 'badge',
    loadComponent: () =>
      import('./pages/badge-documentation').then(c => c.BadgeDocumentation),
    title: 'Badge - Basis UI',
    data: {
      title: 'Badge',
    },
  },
  {
    path: 'button',
    loadComponent: () =>
      import('./pages/button-documentation').then(c => c.ButtonDocumentation),
    title: 'Button - Basis UI',
    data: {
      title: 'Button',
    },
  },
  {
    path: 'card',
    loadComponent: () =>
      import('./pages/card-documentation').then(c => c.CardDocumentation),
    title: 'Card - Basis UI',
    data: {
      title: 'Card',
    },
  },
  {
    path: 'checkbox',
    loadComponent: () =>
      import('./pages/checkbox-documentation').then(
        c => c.CheckboxDocumentation
      ),
    title: 'Checkbox - Basis UI',
    data: {
      title: 'Checkbox',
    },
  },
  {
    path: 'color-picker',
    loadComponent: () =>
      import('./pages/color-picker-documentation').then(
        c => c.ColorPickerDocumentation
      ),
    title: 'Color Picker - Basis UI',
    data: {
      title: 'Color Picker',
    },
  },
  // {
  //   path: 'command',
  //   loadComponent: () =>
  //     import('./pages/command-documentation').then(c => c.CommandDocumentation),
  //   title: 'Command - Basis UI',
  //   data: {
  //     title: 'Command',
  //     badge: 'New'
  //   },
  // },
  {
    path: 'dialog',
    loadComponent: () =>
      import('./pages/dialog-documentation').then(c => c.DialogDocumentation),
    title: 'Dialog - Basis UI',
    data: {
      title: 'Dialog',
    },
  },
  {
    path: 'drawer',
    loadComponent: () =>
      import('./pages/drawer-documentation').then(c => c.DrawerDocumentation),
    title: 'Drawer - Basis UI',
    data: {
      title: 'Drawer',
    },
  },
  {
    path: 'input',
    loadComponent: () =>
      import('./pages/input-documentation').then(c => c.InputDocumentation),
    title: 'Input - Basis UI',
    data: {
      title: 'Input',
    },
  },
  {
    path: 'input-group',
    loadComponent: () =>
      import('./pages/input-group-documentation').then(
        c => c.InputGroupDocumentation
      ),
    title: 'Input Group - Basis UI',
    data: {
      title: 'Input Group',
    },
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./pages/menu-documentation').then(c => c.MenuDocumentation),
    title: 'Menu - Basis UI',
    data: {
      title: 'Menu',
    },
  },
  {
    path: 'otp',
    loadComponent: () =>
      import('./pages/otp-documentation').then(c => c.OtpDocumentation),
    title: 'OTP - Basis UI',
    data: {
      title: 'OTP',
      badge: 'New',
    },
  },
  {
    path: 'range',
    loadComponent: () =>
      import('./pages/range-documentation').then(c => c.RangeDocumentation),
    title: 'Range - Basis UI',
    data: {
      title: 'Range',
    },
  },
  {
    path: 'select',
    loadComponent: () =>
      import('./pages/select-documentation').then(c => c.SelectDocumentation),
    title: 'Select - Basis UI',
    data: {
      title: 'Select',
      badge: 'Updated',
    },
  },
  {
    path: 'sheet',
    loadComponent: () =>
      import('./pages/sheet-documentation').then(c => c.SheetDocumentation),
    title: 'Sheet - Basis UI',
    data: {
      title: 'Sheet',
    },
  },
  {
    path: 'spinner',
    loadComponent: () =>
      import('./pages/spinner-documentation').then(c => c.SpinnerDocumentation),
    title: 'Spinner - Basis UI',
    data: {
      title: 'Spinner',
    },
  },
  {
    path: 'switch',
    loadComponent: () =>
      import('./pages/switch-documentation').then(c => c.SwitchDocumentation),
    title: 'Switch - Basis UI',
    data: {
      title: 'Switch',
    },
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./pages/tabs-documentation').then(c => c.TabsDocumentation),
    title: 'Tabs - Basis UI',
    data: {
      title: 'Tabs',
    },
  },
  {
    path: 'textarea',
    loadComponent: () =>
      import('./pages/textarea-documentation').then(
        c => c.TextareaDocumentation
      ),
    title: 'Textarea - Basis UI',
    data: {
      title: 'Textarea',
    },
  },
  {
    path: 'tooltip',
    loadComponent: () =>
      import('./pages/tooltip-documentation').then(c => c.TooltipDocumentation),
    title: 'Tooltip - Basis UI',
    data: {
      title: 'Tooltip',
      badge: 'Updated',
    },
  },
  {
    path: 'tree',
    loadComponent: () =>
      import('./pages/tree-documentation').then(c => c.TreeDocumentation),
    title: 'Tree - Basis UI',
    data: {
      title: 'Tree',
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
