import { Component, signal } from '@angular/core';
import { Alert, Button, Drawer } from '@basis-ng/primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-drawer-documentation]',
  imports: [CodeBlock, Drawer, Button, StepsButtons, Alert],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Backdrop', path: '/docs/components/backdrop' }"
      [next]="{ label: 'Input', path: '/docs/components/input' }"
    />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback! Expect breaking
      changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Drawer</h1>
    <div class="flex flex-col gap-4">
      <span>
        Drawer is a floating sliding panel for navigation or content. It can appear from the top,
        bottom, left, or right and keeps drag-to-close behavior in every direction.
      </span>
      <code-block [code]="angularImport" />
      <span>Include this to apply predefined styles. The component is headless without it.</span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-900 mb-6"
      >
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-neutral-900">
            <tr>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Property
              </th>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                isOpen
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                boolean
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                side
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                'top' | <strong>'bottom'</strong> | 'left' | 'right'
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                closeThreshold
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                number
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                draggable
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <strong>boolean</strong>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                closable
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <strong>boolean</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Events</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-900 mb-6"
      >
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-neutral-900">
            <tr>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Event
              </th>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                closeSheet
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                void
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Directional Handle</h2>
      <span>
        The drag handle is always placed on the inner edge opposite to the opening direction. For
        example, a right drawer renders the handle on its left edge. When
        <strong>draggable</strong> is false, the handle is hidden and drag-to-close is disabled.
      </span>
      <h2 class="font-semibold text-xl">Sizing</h2>
      <span>
        Use CSS variables on <strong>b-drawer</strong> to customize the panel size.
        <strong>--b-drawer-height</strong> affects top and bottom drawers, and
        <strong>--b-drawer-width</strong> affects left and right drawers.
      </span>
      <h2 class="font-semibold text-xl">Basic Usage</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button (click)="bottomDrawerOpen.set(true)">Open Bottom Drawer</button>
        <b-drawer [(isOpen)]="bottomDrawerOpen">
          <div class="flex h-full items-center justify-center p-6 text-center">
            This drawer opens from the bottom and keeps the drag handle at the top edge.
          </div>
        </b-drawer>
      </div>
      <h2 class="font-semibold text-xl">Top Drawer</h2>
      <code-block [code]="topUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button (click)="topDrawerOpen.set(true)">Open Top Drawer</button>
        <b-drawer [(isOpen)]="topDrawerOpen" [side]="'top'" style="--b-drawer-height: 40dvh">
          <div class="flex h-full items-center justify-center p-6 text-center">
            This drawer opens from the top and places the drag handle at the bottom edge.
          </div>
        </b-drawer>
      </div>
      <h2 class="font-semibold text-xl">Lateral Drawer</h2>
      <code-block [code]="lateralUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <div class="flex flex-wrap items-center justify-center gap-3">
          <button b-button (click)="leftDrawerOpen.set(true)">Open Left Drawer</button>
          <button b-button (click)="rightDrawerOpen.set(true)">Open Right Drawer</button>
        </div>
        <b-drawer [(isOpen)]="leftDrawerOpen" [side]="'left'">
          <div class="flex h-full items-center justify-center p-6 text-center">
            Left drawers place the drag handle on the right inner edge.
          </div>
        </b-drawer>
        <b-drawer [(isOpen)]="rightDrawerOpen" [side]="'right'">
          <div class="flex h-full items-center justify-center p-6 text-center">
            Right drawers place the drag handle on the left inner edge.
          </div>
        </b-drawer>
      </div>
      <h2 class="font-semibold text-xl">Custom Size And Threshold</h2>
      <code-block [code]="customUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button (click)="customDrawerOpen.set(true)">Open Custom Drawer</button>
        <b-drawer
          [(isOpen)]="customDrawerOpen"
          [side]="'right'"
          [closeThreshold]="45"
          style="--b-drawer-width: 500px"
        >
          <div class="flex h-full items-center justify-center p-6 text-center">
            Width and height can be customized with drawer CSS variables.
          </div>
        </b-drawer>
      </div>
      <h2 class="font-semibold text-xl">Disabled Drag</h2>
      <code-block [code]="disabledDragUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button (click)="lockedDrawerOpen.set(true)">Open Locked Drawer</button>
        <b-drawer [(isOpen)]="lockedDrawerOpen" [draggable]="false" [side]="'right'">
          <div class="flex h-full items-center justify-center p-6 text-center">
            This drawer can still be closed from outside click, but it does not render the drag
            handle and cannot be dragged.
          </div>
        </b-drawer>
      </div>
      <h2 class="font-semibold text-xl">Non-Closable</h2>
      <span>
        When <strong>closable</strong> is false, clicking outside the drawer is fully blocked —
        pointer events do not reach elements behind it and the drawer stays open. Use an explicit
        close action inside the content to dismiss it.
      </span>
      <code-block [code]="nonClosableUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button (click)="nonClosableDrawerOpen.set(true)">Open Non-Closable Drawer</button>
        <b-drawer [(isOpen)]="nonClosableDrawerOpen" [closable]="false" [draggable]="false">
          <div class="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <span>Clicking outside does nothing. Use the button below to close.</span>
            <button b-button class="b-variant-secondary" (click)="nonClosableDrawerOpen.set(false)">
              Close
            </button>
          </div>
        </b-drawer>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Backdrop', path: '/docs/components/backdrop' }"
      [next]="{ label: 'Input', path: '/docs/components/input' }"
    />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class DrawerDocumentation {
  angularImport = `import { Drawer } from '@basis-ng/primitives' `;
  stylesImport = `@import '@basis-ng/styles/drawer';`;
  basicUsage = `<button b-button (click)="isOpen = true">Open Bottom Drawer</button>
<b-drawer [(isOpen)]="isOpen">
  <div class="flex h-full items-center justify-center p-6 text-center">
    This drawer opens from the bottom.
  </div>
</b-drawer>`;
  topUsage = `<button b-button (click)="isOpen = true">Open Top Drawer</button>
<b-drawer [(isOpen)]="isOpen" [side]="'top'" style="--b-drawer-height: 40dvh">
  <div class="flex h-full items-center justify-center p-6 text-center">
    This drawer opens from the top.
  </div>
</b-drawer>`;
  lateralUsage = `<button b-button (click)="leftOpen = true">Open Left Drawer</button>
<button b-button (click)="rightOpen = true">Open Right Drawer</button>

<b-drawer [(isOpen)]="leftOpen" [side]="'left'">
  <div class="flex h-full items-center justify-center p-6 text-center">
    Left drawer content.
  </div>
</b-drawer>

<b-drawer [(isOpen)]="rightOpen" [side]="'right'">
  <div class="flex h-full items-center justify-center p-6 text-center">
    Right drawer content.
  </div>
</b-drawer>`;
  customUsage = `<button b-button (click)="isOpen = true">Open Custom Drawer</button>
<b-drawer
  [(isOpen)]="isOpen"
  [side]="'right'"
  [closeThreshold]="45"
  style="--b-drawer-width: 500px"
>
  <div class="flex h-full items-center justify-center p-6 text-center">
    This drawer uses a custom width and close threshold.
  </div>
</b-drawer>`;
  disabledDragUsage = `<button b-button (click)="isOpen = true">Open Locked Drawer</button>
<b-drawer [(isOpen)]="isOpen" [side]="'right'" [draggable]="false">
  <div class="flex h-full items-center justify-center p-6 text-center">
    This drawer does not render the drag handle and cannot be dragged.
  </div>
</b-drawer>`;
  nonClosableUsage = `<button b-button (click)="isOpen = true">Open Non-Closable Drawer</button>
<b-drawer [(isOpen)]="isOpen" [closable]="false" [draggable]="false">
  <div class="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
    <span>Clicking outside does nothing.</span>
    <button b-button (click)="isOpen = false">Close</button>
  </div>
</b-drawer>`;
  readonly bottomDrawerOpen = signal(false);
  readonly topDrawerOpen = signal(false);
  readonly leftDrawerOpen = signal(false);
  readonly rightDrawerOpen = signal(false);
  readonly customDrawerOpen = signal(false);
  readonly lockedDrawerOpen = signal(false);
  readonly nonClosableDrawerOpen = signal(false);
}
