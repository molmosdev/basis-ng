import { Component } from '@angular/core';
import { CodeBlock } from './components/shared/components/code-block';
import { StepsButtons } from './shared/components/steps-buttons';
import { Badge } from 'primitives';

@Component({
  selector: 'article[app-theming]',
  imports: [CodeBlock, StepsButtons, Badge],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Installation', path: '/docs/installation' }"
      [next]="{ label: 'Alert', path: '/docs/components/alert' }" />
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      Theming
      <span b-badge class="b-variant-outlined b-size-sm"> New </span>
    </h1>
    <div class="flex flex-col gap-4">
      <p>
        Easily customize your application's look and feel using theme and
        Tailwind tokens. Define your own fonts, radius, and color palettes for
        both light and dark modes. Example:
      </p>
      <code-block [code]="themingExample" />
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Installation', path: '/docs/installation' }"
      [next]="{ label: 'Alert', path: '/docs/components/alert' }" />
  `,
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class Theming {
  readonly themingExample = `@theme {
  /* Font family */
  --font-display: 'Geist', sans-serif;
  --font-display-mono: 'Geist Mono', monospace;

  /* Rounded sizes */
  --radius-size-xs: 0.25rem;
  --radius-size-sm: 0.375rem;
  --radius-size-md: 0.5rem;
  --radius-size-lg: 0.75rem;

  /* Light theme colors */
  --color-background: #fff;
  --color-font: #0a0a0a;
  --color-primary: #0a0a0a;
  --color-primary-foreground: #fff;
  --color-secondary: #f5f5f5;
  --color-secondary-foreground: #0a0a0a;
  --color-ring: #e0e0e0;
  --color-destructive: #e53935;
  --color-destructive-foreground: #fff;
  --color-success: #b7e4c7;
  --color-success-foreground: #22543d;
  --color-warning: #fff3cd;
  --color-warning-foreground: #856404;
  --color-info: #e0e0e0;
  --color-info-foreground: #333;

  /* Dark theme colors */
  --color-background-dark: #0a0a0a;
  --color-font-dark: #fff;
  --color-bg-dark: #0a0a0a;
  --color-primary-dark: #fff;
  --color-primary-foreground-dark: #0a0a0a;
  --color-secondary-dark: #262626;
  --color-secondary-foreground-dark: #fff;
  --color-ring-dark: #ffffff26;
  --color-destructive-dark: #ff6659;
  --color-destructive-foreground-dark: #0a0a0a;
  --color-success-dark: #22543d;
  --color-success-foreground-dark: #d1fae5;
  --color-warning-dark: #856404;
  --color-warning-foreground-dark: #ffe066;
  --color-info-dark: #424242;
  --color-info-foreground-dark: #e0e0e0;
}`;
}
