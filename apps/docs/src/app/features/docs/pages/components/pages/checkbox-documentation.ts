import { Component } from '@angular/core';
import { Alert, Checkbox } from '@basis-ng/primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-checkbox-documentation]',
  imports: [CodeBlock, Checkbox, StepsButtons, Alert],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Card', path: '/docs/components/card' }"
      [next]="{
        label: 'Dialog',
        path: '/docs/components/dialog',
      }"
    />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback! Expect breaking
      changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Checkbox</h1>
    <div class="flex flex-col gap-4">
      <span>Checkbox is a custom toggle component.</span>
      <code-block [code]="angularImport" />
      <span>Include this to apply predefined styles. The component is headless without it.</span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Checkbox properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-900 mb-6"
      >
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-neutral-900">
            <tr>
              <th class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Prop
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
                value
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                <b class="font-bold">false</b>
                | ModelSignal&lt;boolean&gt;
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                valueChange
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap"
              >
                OutputEmitterRef&lt;boolean&gt;
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-checkbox [(value)]="checkboxValue"></button>
      </div>
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-checkbox class="b-size-sm"></button>
        <button b-checkbox class="b-size-md"></button>
        <button b-checkbox class="b-size-lg"></button>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Card', path: '/docs/components/card' }"
      [next]="{
        label: 'Dialog',
        path: '/docs/components/dialog',
      }"
    />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class CheckboxDocumentation {
  angularImport = `import { Checkbox } from '@basis-ng/primitives' `;
  stylesImport = `@import '@basis-ng/styles/checkbox';`;
  basicUsage = `<button b-checkbox [(value)]="checkboxValue"></button>`;
  sizesUsage = `<button b-checkbox class="b-size-sm"></button>\n<button b-checkbox class="b-size-md"></button>\n<button b-checkbox class="b-size-lg"></button>`;

  checkboxValue = false;
}
