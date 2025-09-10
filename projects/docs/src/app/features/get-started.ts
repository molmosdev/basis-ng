import { Component, signal } from '@angular/core';
import { componentsRoutes } from './documentation/pages/components/components.routes';
import { Route } from '@angular/router';
import { CodeBlockComponent } from './documentation/pages/components/shared/components/code-block.component';

@Component({
  selector: 'app-get-started',
  imports: [CodeBlockComponent],
  template: `
    <article class="flex flex-col gap-2 max-w-3xl">
      <h1 class="font-bold text-2xl">Introduction</h1>
      <span>
        Basis is an Angular component library designed for speed, flexibility, and design consistency. Use primitives library for headless, logic-driven components, and styles library for ready-to-use Tailwind-based styles, fully configurable with @theme.
      </span>
    </article>
    <article class="flex flex-col gap-5 max-w-3xl">
      <h1 class="font-bold text-2xl">Installation</h1>
      <code-block [code]="'npm install @basis-ng/primitives @basis-ng/styles'" />
    </article>
    <article class="flex flex-col gap-2 max-w-3xl">
      <h1 class="font-bold text-2xl">Theming</h1>
      <span class="mb-3">
        Easily customize your application's look and feel using <strong>@thema</strong> and Tailwind tokens. Define your own fonts, radii, and color palettes for both light and dark modes. Example:
      </span>
      <code-block [code]="themingExample" />
    </article>
    <article class="flex flex-col gap-5">
      <h1 class="font-bold text-2xl">Components</h1>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        @for (route of routes(); track route.title) {
          @if (route.data?.['title']) {
            <div
              class="p-4 relative h-30 inset-ring-1 inset-ring-secondary bg-primary/5 hover:bg-primary/10 dark:inset-ring-secondary-dark dark:bg-primary-dark/5 dark:hover:bg-primary-dark/10 rounded-lg transition-all duration-150 cursor-pointer">
              <h2>{{ route.data?.['title'] }}</h2>
              @if (route.data?.['new']) {
                <span
                  class="absolute top-2 right-2 bg-primary/5 dark:bg-primary-dark/5 text-xs font-semibold px-2 py-1 rounded-md"
                  >New</span
                >
              }
            </div>
          }
        }
      </div>
    </article>
  `,
  host: {
    class: 'flex flex-col px-8 gap-9 pb-8',
  },
})
export class GetStarted {
  readonly routes = signal<Route[]>(componentsRoutes);
  readonly themingExample = `@import 'tailwindcss';\n\n@theme {\n  /* Font family */\n  --font-display: 'Geist', sans-serif;\n  --font-display-mono: 'Geist Mono', monospace;\n\n  /* Rounded sizes */\n  --radius-size-xs: 0.25rem;\n  --radius-size-sm: 0.375rem;\n  --radius-size-md: 0.5rem;\n  --radius-size-lg: 0.75rem;\n\n  /* Light theme colors */\n  --color-background: #fff;\n  --color-font: #0a0a0a;\n  --color-primary: #0a0a0a;\n  --color-primary-foreground: #fff;\n  --color-secondary: color-mix(in srgb, #fff, #0a0a0a 8%);\n  --color-secondary-foreground: #0a0a0a;\n  --color-destructive: #e53935;\n  --color-destructive-foreground: #fff;\n\n  /* Dark theme colors */\n  --color-background-dark: #0a0a0a;\n  --color-font-dark: #fff;\n  --color-bg-dark: #0a0a0a;\n  --color-primary-dark: #fff;\n  --color-primary-foreground-dark: #0a0a0a;\n  --color-secondary-dark: color-mix(in srgb, #0a0a0a, #fff 8%);\n  --color-secondary-foreground-dark: #fff;\n  --color-destructive-dark: #ff6659;\n  --color-destructive-foreground-dark: #0a0a0a;\n}`;
}
