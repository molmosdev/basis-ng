import { Component, signal } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { Button, DrawerComponent, Alert } from '@basis-ng/primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { StepsButtons } from '../../shared/components/steps-buttons';

@Component({
  selector: 'article[app-drawer-documentation]',
  imports: [CodeBlock, DrawerComponent, Button, StepsButtons, Alert],
  providers: [provideIcons({ lucideRocket })],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Dialog', path: '/docs/components/dialog' }"
      [next]="{ label: 'Input', path: '/docs/components/input' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Drawer</h1>
    <div class="flex flex-col gap-4">
      <span>Drawer is a sliding panel for navigation or content.</span>
      <code-block [code]="angularImport" />
      <span
        >Include this to apply predefined styles. The component is headless
        without it.</span
      >
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">
                Property
              </th>
              <th
                class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                isOpen
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                boolean
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                height
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                string
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                closeThreshold
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                number
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Events</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">
                Event
              </th>
              <th
                class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                closeSheet
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                void
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic Usage</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <button b-button (click)="basicDrawerOpen.set(true)">
          Open Drawer
        </button>
        <b-drawer [(isOpen)]="basicDrawerOpen" [height]="'50dvh'">
          <div
            style="display: flex; justify-content: center; align-items: center; height: 100%;">
            This is the content of the drawer.
          </div>
        </b-drawer>
      </div>
      <h2 class="font-semibold text-xl">Custom Height</h2>
      <code-block [code]="customHeightUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <button b-button (click)="customHeightDrawerOpen.set(true)">
          Open Drawer
        </button>
        <b-drawer [(isOpen)]="customHeightDrawerOpen" [height]="'70dvh'">
          <div
            style="display: flex; justify-content: center; align-items: center; height: 100%;">
            This is a taller drawer.
          </div>
        </b-drawer>
      </div>
      <h2 class="font-semibold text-xl">Custom Close Threshold</h2>
      <code-block [code]="customCloseThresholdUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <button b-button (click)="customThresholdDrawerOpen.set(true)">
          Open Drawer
        </button>
        <b-drawer [(isOpen)]="customThresholdDrawerOpen" [closeThreshold]="70">
          <div
            style="display: flex; justify-content: center; align-items: center; height: 100%;">
            This drawer requires dragging down 70% to close.
          </div>
        </b-drawer>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Dialog', path: '/docs/components/dialog' }"
      [next]="{ label: 'Input', path: '/docs/components/input' }" />
  `,
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class DrawerDocumentation {
  angularImport = `import { DrawerComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/drawer';`;
  basicUsage = `<button b-button (click)="isOpen = true">Open Drawer</button>
<b-drawer [(isOpen)]="isOpen" [height]="'50dvh'">
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    This is the content of the drawer.
  </div>
</b-drawer>`;
  customHeightUsage = `<button b-button (click)="isOpen = true">Open Drawer</button>
<b-drawer [(isOpen)]="isOpen" [height]="'70dvh'">
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    This is a taller drawer.
  </div>
</b-drawer>`;
  customCloseThresholdUsage = `<button b-button (click)="isOpen = true">Open Drawer</button>
<b-drawer [(isOpen)]="isOpen" [closeThreshold]="70">
  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
    This drawer requires dragging down 70% to close.
  </div>
</b-drawer>`;
  readonly basicDrawerOpen = signal(false);
  readonly customHeightDrawerOpen = signal(false);
  readonly customThresholdDrawerOpen = signal(false);
}
