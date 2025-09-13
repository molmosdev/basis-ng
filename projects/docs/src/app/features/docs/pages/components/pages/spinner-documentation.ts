import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { Spinner, Button, Alert } from '@basis-ng/primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';

@Component({
  selector: 'article[app-spinner-documentation]',
  imports: [CodeBlock, Spinner, Button, StepsButtons, Alert],
  providers: [provideIcons({ lucideRocket })],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Sheet', path: '/docs/components/sheet' }"
      [next]="{ label: 'Switch', path: '/docs/components/switch' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Spinner</h1>
    <div class="flex flex-col gap-4">
      <span>
        Spinner is a loading indicator component. It supports three sizes and
        two visual types for flexible use in buttons or as a standalone
        indicator.<br />
      </span>
      <code-block [code]="angularImport" />
      <span>
        Include the styles for the spinner. The component is headless without
        them.<br />
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
                size
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                'sm' | <b class="font-bold">'md'</b> | 'lg'
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                type
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                <b class="font-bold">'bars'</b> | 'circle'
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Examples</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-row items-center justify-center gap-8">
        <b-spinner size="sm" />
        <b-spinner size="md" />
        <b-spinner size="lg" />
      </div>
      <h3 class="font-semibold text-lg">Type: bars (default)</h3>
      <code-block [code]="barsUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex items-center justify-center gap-4">
        <b-spinner type="bars" size="md" />
      </div>
      <h3 class="font-semibold text-lg">Type: circle</h3>
      <code-block [code]="circleUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex items-center justify-center gap-4">
        <b-spinner type="circle" size="md" />
      </div>
      <h2 class="font-semibold text-xl">Usage in Button</h2>
      <code-block [code]="buttonUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex items-center justify-center gap-4">
        <button b-button>
          <b-spinner size="sm" />
          Loading...
        </button>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Sheet', path: '/docs/components/sheet' }"
      [next]="{ label: 'Switch', path: '/docs/components/switch' }" />
  `,
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class SpinnerDocumentation {
  angularImport = `import { Spinner } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/spinner';`;
  basicUsage = `<b-spinner size="sm" />\n<b-spinner size="md" />\n<b-spinner size="lg" />`;
  barsUsage = `<b-spinner type="bars" size="md" />`;
  circleUsage = `<b-spinner type="circle" size="md" />`;
  buttonUsage = `<button b-button>\n  <b-spinner size="sm" />\n  Cargando...\n</button>`;
}
