import { Component } from '@angular/core';
import { CodeBlock } from './components/shared/components/code-block';
import { StepsButtons } from './shared/components/steps-buttons';
import { Badge } from '@basis-ng/primitives';

@Component({
  selector: 'article[app-theming]',
  imports: [CodeBlock, StepsButtons, Badge],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Installation', path: '/docs/installation' }"
      [next]="{ label: 'Button', path: '/docs/components/button' }" />
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      Theming
      <span b-badge variant="outlined" size="sm"> New </span>
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
      [next]="{ label: 'Button', path: '/docs/components/button' }" />
  `,
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class Theming {
  readonly themingExample = `@import 'tailwindcss';\n\n@theme {\n  /* Font family */\n  --font-display: 'Geist', sans-serif;\n  --font-display-mono: 'Geist Mono', monospace;\n\n  /* Rounded sizes */\n  --radius-size-xs: 0.25rem;\n  --radius-size-sm: 0.375rem;\n  --radius-size-md: 0.5rem;\n  --radius-size-lg: 0.75rem;\n\n  /* Light theme colors */\n  --color-background: #fff;\n  --color-font: #0a0a0a;\n  --color-primary: #0a0a0a;\n  --color-primary-foreground: #fff;\n  --color-secondary: color-mix(in srgb, #fff, #0a0a0a 8%);\n  --color-secondary-foreground: #0a0a0a;\n  --color-destructive: #e53935;\n  --color-destructive-foreground: #fff;\n\n  /* Dark theme colors */\n  --color-background-dark: #0a0a0a;\n  --color-font-dark: #fff;\n  --color-bg-dark: #0a0a0a;\n  --color-primary-dark: #fff;\n  --color-primary-foreground-dark: #0a0a0a;\n  --color-secondary-dark: color-mix(in srgb, #0a0a0a, #fff 8%);\n  --color-secondary-foreground-dark: #fff;\n  --color-destructive-dark: #ff6659;\n  --color-destructive-foreground-dark: #0a0a0a;\n}`;
}
