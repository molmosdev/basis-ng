import { Component } from '@angular/core';
import { Popover, PopoverContent, PopoverTrigger } from '@basis-ng/primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-popover-documentation]',
  standalone: true,
  imports: [CodeBlock, StepsButtons, Popover, PopoverContent, PopoverTrigger],
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
        <button bPopoverTrigger #triggerBasic="bPopoverTrigger" class="b-button">
          Open popover
        </button>
        <ng-template bPopover [trigger]="triggerBasic">
          <b-popover-content>
            This is a popover. It supports multiple lines of text and flexible sizing. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Integer nec odio.
          </b-popover-content>
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
  angularImport = `import { Popover, PopoverContent, PopoverTrigger } from '@basis-ng/primitives';`;
  stylesImport = `@import '@basis-ng/styles/index.css';`;
  basicUsage = `<button bPopoverTrigger #trigger="bPopoverTrigger">Open popover</button>
<ng-template bPopover [trigger]="trigger">
  <b-popover-content>
    Multi-line popover content goes here. It will wrap and grow vertically as needed.
  </b-popover-content>
</ng-template>`;
}
