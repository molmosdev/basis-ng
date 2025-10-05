import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  PopoverTrigger,
  Popover,
  PopoverContent,
} from 'primitives';

@Component({
  selector: 'app-home',
  imports: [
    Button,
    RouterLink,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
  ],
  template: `
    <h1 class="font-medium text-4xl md:text-5xl xl:text-6xl text-center">
      A minimal UI toolkit for Angular
    </h1>
    <span
      class="font-display-mono md:max-w-2/3 lg:max-w-1/2 xl:max-w-3/6 text-center">
      Headless by design. Style it your way or use our pre-defined Tailwind styles for each component, 
      with easy customization via <code>@theme</code>. Build fast, accessible, and design-system-friendly apps — without the bloat.
    </span>
    <b-popover>
      <button b-button routerLink="/docs" bPopoverTrigger mode="hover">Get started</button>
      <ng-template #popoverContent>
        <b-popover-content position="bottom">
          <b-card>
            <b-card-header>
              <b-card-title>Welcome to Basis</b-card-title>
              <b-card-description>
                Your journey to building beautiful Angular apps starts here.
              </b-card-description>
            </b-card-header>
          </b-card>
        </b-popover-content>
      </ng-template>
    </b-popover>
  `,
  host: {
    class:
      'flex h-[calc(100dvh-5rem)] flex-col justify-center items-center gap-5 px-8 h-20',
  },
})
export class Home {}
