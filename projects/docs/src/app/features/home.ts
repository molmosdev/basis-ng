import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button, PopoverTrigger } from 'primitives';

@Component({
  selector: 'app-home',
  imports: [Button, RouterLink, PopoverTrigger],
  template: `
    <h1 class="font-medium text-4xl md:text-5xl xl:text-6xl text-center">
      A minimal UI toolkit for Angular
    </h1>
    <span
      class="font-display-mono md:max-w-2/3 lg:max-w-1/2 xl:max-w-3/6 text-center">
      Headless by design. Style it your way or use our pre-defined Tailwind styles for each component, 
      with easy customization via <code>@theme</code>. Build fast, accessible, and design-system-friendly apps — without the bloat.
    </span>
      <button b-button routerLink="/docs" bPopoverTrigger mode="hover">Get started</button>
  `,
  host: {
    class:
      'flex h-[calc(100dvh-5rem)] flex-col justify-center items-center gap-5 px-8 h-20',
  },
})
export class Home {}
