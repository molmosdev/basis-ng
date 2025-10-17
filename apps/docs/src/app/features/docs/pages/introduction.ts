import { Component } from '@angular/core';
import { StepsButtons } from './shared/components/steps-buttons';

@Component({
  selector: 'article[app-introduction]',
  imports: [StepsButtons],
  template: `
    <h1 class="font-bold text-2xl">Introduction</h1>
    <span class="flex flex-col gap-4">
      Basis is an Angular component library designed for speed, flexibility, and design consistency.
      Use primitives library for headless, logic-driven components, and styles library for
      ready-to-use Tailwind-based styles, fully configurable with &#64;theme.
    </span>
    <app-steps-buttons [next]="{ label: 'Installation', path: '/docs/installation' }" />
  `,
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class Introduction {}
