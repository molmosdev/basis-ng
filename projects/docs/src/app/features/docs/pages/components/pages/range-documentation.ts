import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { Alert, RangeComponent } from '@basis-ng/primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';

@Component({
  selector: 'article[app-range-documentation]',
  imports: [CodeBlock, RangeComponent, StepsButtons, Alert],
  providers: [provideIcons({ lucideRocket })],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'OTP', path: '/docs/components/otp' }"
      [next]="{ label: 'Select', path: '/docs/components/select' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Range</h1>
    <div class="flex flex-col gap-4">
      <span> Range is a custom slider component. </span>
      <code-block [code]="angularImport" />
      <span>
        Include this to apply predefined styles. The component is headless
        without it.
      </span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">
                Prop
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
                value
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                number
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                min
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                string
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                max
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                string
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                step
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                string
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
                valueChange
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                number
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <input
          type="range"
          b-range
          [value]="basicValue"
          [maxWidth]="'240px'"
          (valueChange)="onValueChange($event)" />
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'OTP', path: '/docs/components/otp' }"
      [next]="{ label: 'Select', path: '/docs/components/select' }" />
  `,
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class RangeDocumentation {
  angularImport = `import { RangeComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/range';`;
  basicUsage = `<input type="range" b-range [value]="basicValue" (valueChange)="onValueChange($event)" />`;
  basicValue = '50';
  onValueChange(value: string) {
    this.basicValue = value;
  }
}
