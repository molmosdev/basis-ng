import { Component } from '@angular/core';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Popover,
  PopoverTrigger,
} from '@basis-ng/primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-popover-documentation]',
  standalone: true,
  imports: [
    CodeBlock,
    StepsButtons,
    Button,
    Popover,
    PopoverTrigger,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    CardDescription,
  ],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Tooltip', path: '/docs/components/tooltip' }"
      [next]="{ label: 'Tree', path: '/docs/components/tree' }"
    />
    <h1 class="font-bold text-2xl">Popover</h1>
    <div class="flex flex-col gap-4">
      <span>
        Popovers are similar to tooltips but are intended for larger, multi-line content. They use
        padding-based sizing (no fixed heights) and by default adopt the secondary visual style.
      </span>
      <code-block [code]="angularImport" />
      <code-block [code]="stylesImport" />

      <h2 class="font-semibold text-xl">Basic usage</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button bPopoverTrigger #triggerBasic="bPopoverTrigger" class="b-button">
          Open popover
        </button>
        <ng-template bPopover [trigger]="triggerBasic">
          <b-card class="w-full max-w-[320px]">
            <b-card-header>
              <b-card-title>Popover Card</b-card-title>
              <b-card-description>A small card inside a popover</b-card-description>
            </b-card-header>
            <b-card-content>
              This popover contains a card component — popover content is now fully dynamic. You can
              put any component or markup here.
            </b-card-content>
            <b-card-footer>
              <button b-button class="b-variant-outlined">Close</button>
              <button b-button>Action</button>
            </b-card-footer>
          </b-card>
        </ng-template>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Tooltip', path: '/docs/components/tooltip' }"
      [next]="{ label: 'Tree', path: '/docs/components/tree' }"
    />
  `,
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class PopoverDocumentation {
  angularImport = `import { Popover, PopoverTrigger } from '@basis-ng/primitives';`;
  stylesImport = `@import '@basis-ng/styles/index.css';`;
  basicUsage = `<button b-button bPopoverTrigger #trigger="bPopoverTrigger">Open popover</button>
<ng-template bPopover [trigger]="trigger">
  <div class="b-popover-content">Multi-line popover content goes here. It will wrap and grow vertically as needed.</div>
</ng-template>`;
}
