import { Component, signal } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { Sheet, Button, Alert } from '@basis-ng/primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';

@Component({
  selector: 'article[app-sheet-documentation]',
  imports: [CodeBlock, Sheet, Button, StepsButtons, Alert],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Select', path: '/docs/components/select' }"
      [next]="{ label: 'Spinner', path: '/docs/components/spinner' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Sheet</h1>
    <div class="flex flex-col gap-4">
      <span>
        Sheet is a sliding panel that appears from the left or right side of the
        screen.
      </span>
      <code-block [code]="angularImport" />
      <span>
        Include this to apply predefined styles. The component is headless
        without it.
      </span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-700 dark:bg-neutral-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
                Property
              </th>
              <th
                class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono">
                isOpen
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono">
                <strong>boolean</strong>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono">
                side
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono">
                'left' | <strong>'right'</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Events</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-700 dark:bg-neutral-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
                Event
              </th>
              <th
                class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono">
                closeSheet
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono">
                void
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic Usage</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col gap-4 items-center">
        <button b-button (click)="openLeftSheet()">Open Left Sheet</button>
        <button b-button (click)="openRightSheet()">Open Right Sheet</button>
      </div>
      <b-sheet
        [(isOpen)]="isLeftOpen"
        [side]="'left'"
        (closeSheet)="isLeftOpen.set(false)">
        <div class="flex items-center justify-center h-full">
          This is the left sheet.
        </div>
      </b-sheet>
      <b-sheet
        [(isOpen)]="isRightOpen"
        [side]="'right'"
        (closeSheet)="isRightOpen.set(false)">
        <div class="flex items-center justify-center h-full">
          This is the right sheet.
        </div>
      </b-sheet>
      <h2 class="font-semibold text-xl">Custom Width</h2>
      <code-block [code]="customWidthUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col gap-4 items-center">
        <button b-button (click)="openCustomWidthSheet()">
          Open Custom Width Sheet
        </button>
      </div>
      <b-sheet
        [(isOpen)]="isCustomWidthOpen"
        class="!w-[500px]"
        [side]="'right'"
        (closeSheet)="isCustomWidthOpen.set(false)">
        <div class="flex items-center justify-center h-full">
          This is a custom width sheet.
        </div>
      </b-sheet>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Select', path: '/docs/components/select' }"
      [next]="{ label: 'Spinner', path: '/docs/components/spinner' }" />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class SheetDocumentation {
  angularImport = `import { Sheet } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/sheet';`;
  basicUsage = `<button b-button (click)="openLeftSheet()">Open Left Sheet</button>\n<button b-button (click)="openRightSheet()">Open Right Sheet</button>\n\n<b-sheet\n  [(isOpen)]="isLeftOpen"\n  [side]="'left'">\n  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">\n    This is the left sheet.\n  </div>\n</b-sheet>\n\n<b-sheet\n  [(isOpen)]="isRightOpen"\n  [side]="'right'">\n  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">\n    This is the right sheet.\n  </div>\n</b-sheet>`;
  customWidthUsage = `<button b-button (click)="openCustomWidthSheet()">Open Custom Width Sheet</button>\n\n<b-sheet\n  [(isOpen)]="isCustomWidthOpen"\n  style="width: 500px;"\n  [side]="'right'">\n  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">\n    This is a custom width sheet.\n  </div>\n</b-sheet>\n\n<!-- With Tailwind predefined styles -->\n<b-sheet\n  [(isOpen)]="isCustomWidthOpen"\n  class="!w-[500px]"\n  [side]="'right'">\n  <div style="display: flex; justify-content: center; align-items: center; height: 100%;">\n    This is a custom width sheet.\n  </div>\n</b-sheet>`;
  readonly isLeftOpen = signal<boolean>(false);
  readonly isRightOpen = signal<boolean>(false);
  readonly isCustomWidthOpen = signal<boolean>(false);

  openLeftSheet() {
    this.isLeftOpen.set(true);
  }

  openRightSheet() {
    this.isRightOpen.set(true);
  }

  openCustomWidthSheet() {
    this.isCustomWidthOpen.set(true);
  }
}
