import { Component, signal } from '@angular/core';
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
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      Popover
      <span b-badge class="b-variant-secondary b-size-sm"> New </span>
    </h1>
    <div class="flex flex-col gap-4">
      <span>
        Popovers are similar to tooltips but are intended for larger, multi-line content. They use
        padding-based sizing (no fixed heights) and by default adopt the secondary visual style.
      </span>
      <code-block [code]="angularImport" />
      <span>Include this to apply the styles</span>
      <code-block [code]="stylesImport" />

      <h2 class="font-semibold text-xl">Basic usage</h2>
      <code-block [code]="simpleCardUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button bPopoverTrigger #triggerSimple="bPopoverTrigger" class="b-button">
          Open simple popover
        </button>
        <ng-template bPopover [trigger]="triggerSimple">
          <b-card class="w-full max-w-[320px]">
            <b-card-header>
              <b-card-title>Simple Popover Card</b-card-title>
            </b-card-header>
            <b-card-content>
              This is a simple card inside a popover. The popover will close by clicking outside or
              using the built-in dismissal behavior.
            </b-card-content>
          </b-card>
        </ng-template>
      </div>

      <h2 class="font-semibold text-xl">Usage with button</h2>
      <code-block [code]="usageWithButton" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button
          b-button
          bPopoverTrigger
          #triggerBasic="bPopoverTrigger"
          [(active)]="openState"
          class="b-button"
        >
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
              <button b-button class="b-variant-outlined" (click)="openState.set(false)">
                Close
              </button>
              <button b-button>Action</button>
            </b-card-footer>
          </b-card>
        </ng-template>
      </div>

      <h2 class="font-semibold text-xl">Scroll strategies</h2>
      <span>Try each example and scroll the page to observe how the popover behaves.</span>

      <h3 class="font-medium">Reposition (default)</h3>
      <code-block [code]="scrollRepositionUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button bPopoverTrigger #triggerReposition="bPopoverTrigger" class="b-button">
          Open (reposition)
        </button>
        <ng-template bPopover [trigger]="triggerReposition" scrollStrategy="reposition">
          <b-card class="w-full max-w-[320px]">
            <b-card-content
              >Reposition strategy: the popover will try to reposition when the viewport
              changes.</b-card-content
            >
          </b-card>
        </ng-template>
      </div>

      <h3 class="font-medium">Close</h3>
      <code-block [code]="scrollCloseUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button bPopoverTrigger #triggerClose="bPopoverTrigger" class="b-button">
          Open (close)
        </button>
        <ng-template bPopover [trigger]="triggerClose" scrollStrategy="close">
          <b-card class="w-full max-w-[320px]">
            <b-card-content
              >Close strategy: the popover will close when the page is scrolled.</b-card-content
            >
          </b-card>
        </ng-template>
      </div>

      <h3 class="font-medium">Block</h3>
      <code-block [code]="scrollBlockUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button bPopoverTrigger #triggerBlock="bPopoverTrigger" class="b-button">
          Open (block)
        </button>
        <ng-template bPopover [trigger]="triggerBlock" scrollStrategy="block">
          <b-card class="w-full max-w-[320px]">
            <b-card-content
              >Block strategy: scrolling is blocked while the popover is open.</b-card-content
            >
          </b-card>
        </ng-template>
      </div>

      <app-steps-buttons
        [previous]="{ label: 'Tooltip', path: '/docs/components/tooltip' }"
        [next]="{ label: 'Tree', path: '/docs/components/tree' }"
      />
    </div>
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
  simpleCardUsage = `<button b-button bPopoverTrigger #triggerSimple="bPopoverTrigger">Open simple popover</button>
<ng-template bPopover [trigger]="triggerSimple">
  <b-card class="w-full max-w-[320px]">
    <b-card-header>
      <b-card-title>Simple Popover Card</b-card-title>
    </b-card-header>
    <b-card-content>
      This is a simple card inside a popover. It has no close buttons and relies on outside clicks to dismiss.
    </b-card-content>
  </b-card>
</ng-template>`;
  // Usage with active binding example
  usageWithButton = `<button b-button bPopoverTrigger #trigger="bPopoverTrigger" [(active)]="openState">Open popover</button>
<ng-template bPopover [trigger]="trigger">
  <b-card class="w-full max-w-[320px]">
    <b-card-header>
      <b-card-title>Popover Card</b-card-title>
      <b-card-description>A small card inside a popover</b-card-description>
    </b-card-header>
    <b-card-content>
      This popover contains a card component — popover content is now fully dynamic. You can put any component or markup here.
    </b-card-content>
    <b-card-footer>
      <button b-button class="b-variant-outlined" (click)="openState.set(false)">Close</button>
      <button b-button>Action</button>
    </b-card-footer>
  </b-card>
</ng-template>`;

  openState = signal(false);

  scrollRepositionUsage = `<button b-button bPopoverTrigger #triggerReposition="bPopoverTrigger">Open (reposition)</button>
<ng-template bPopover [trigger]="triggerReposition" scrollStrategy="reposition">
  <div class="b-popover-content">Reposition strategy — popover will try to adjust its position on scroll.</div>
</ng-template>`;

  scrollCloseUsage = `<button b-button bPopoverTrigger #triggerClose="bPopoverTrigger">Open (close)</button>
<ng-template bPopover [trigger]="triggerClose" scrollStrategy="close">
  <div class="b-popover-content">Close strategy — the popover will close when the page scrolls.</div>
</ng-template>`;

  scrollBlockUsage = `<button b-button bPopoverTrigger #triggerBlock="bPopoverTrigger">Open (block)</button>
<ng-template bPopover [trigger]="triggerBlock" scrollStrategy="block">
  <div class="b-popover-content">Block strategy — scrolling is blocked while the popover is open.</div>
</ng-template>`;
}
