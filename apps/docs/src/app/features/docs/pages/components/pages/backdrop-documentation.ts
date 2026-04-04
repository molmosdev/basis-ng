import { Component, signal } from '@angular/core';
import {
  Alert,
  Backdrop,
  Button,
  Drawer,
} from '../../../../../../../../../libs/primitives/src/public-api';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-backdrop-documentation]',
  imports: [CodeBlock, StepsButtons, Alert, Backdrop, Button, Drawer],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Dialog', path: '/docs/components/dialog' }"
      [next]="{ label: 'Drawer', path: '/docs/components/drawer' }"
    />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback! Expect breaking
      changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Backdrop</h1>
    <div class="flex flex-col gap-4">
      <span>
        Backdrop is a standalone primitive for dimming the viewport behind floating UI. It does not
        position content for you; instead, you compose it with drawers, dialogs, cards, or any fixed
        layer you want to render above the page.
      </span>
      <code-block [code]="angularImport" />
      <span>Include this to apply predefined styles. The primitive is headless without them.</span>
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
                progress
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                number | null
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                maxOpacity
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
                closeOnClick
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
                animated
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                boolean
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
                backdropClick
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
      <h2 class="font-semibold text-xl">Basic usage</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button (click)="open.set(true)">Open Backdrop</button>
        <b-backdrop [(isOpen)]="open">
          <b-drawer [(isOpen)]="open" style="--b-drawer-height: 16rem">
            <div class="flex h-full flex-col gap-4 p-6 pt-12">
              <h3 class="m-0 text-lg font-semibold">Drawer with external backdrop</h3>
              <p class="m-0 text-sm opacity-70">
                Backdrop stays outside the drawer and can be reused with any floating primitive.
              </p>
              <div class="mt-auto flex justify-end">
                <button b-button class="b-variant-secondary" (click)="open.set(false)">
                  Close
                </button>
              </div>
            </div>
          </b-drawer>
        </b-backdrop>
      </div>
      <h2 class="font-semibold text-xl">Controlled opacity</h2>
      <code-block [code]="opacityUsage" />
      <span>
        When you pass <strong>progress</strong>, the backdrop opacity follows that value. This is
        useful for overlays that drag or animate with a custom progress signal.
      </span>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Dialog', path: '/docs/components/dialog' }"
      [next]="{ label: 'Drawer', path: '/docs/components/drawer' }"
    />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class BackdropDocumentation {
  angularImport = `import { Backdrop } from '@basis-ng/primitives';`;
  stylesImport = `@import '@basis-ng/styles/backdrop';
@import '@basis-ng/styles/drawer';`;
  basicUsage = `<button b-button (click)="open.set(true)">Open Backdrop</button>

<b-backdrop [(isOpen)]="open">
  <b-drawer [(isOpen)]="open" style="--b-drawer-height: 16rem">
    <div class="flex h-full flex-col gap-4 p-6 pt-12">
      Drawer content rendered above the backdrop.
    </div>
  </b-drawer>
</b-backdrop>`;
  opacityUsage = `<b-backdrop [isOpen]="open()" [progress]="dragProgress()" [maxOpacity]="0.18">
  <div class="fixed inset-x-4 bottom-4 z-1000 rounded-xl bg-surface p-6 shadow-lg">
    Backdrop opacity follows drag progress.
  </div>
</b-backdrop>`;
  readonly open = signal(false);
}
