import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { Button, ButtonGroup, Spinner } from '@basis-ng/primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideZoomIn, lucideZoomOut, lucideSearch } from '@ng-icons/lucide';

@Component({
  selector: 'article[app-button-documentation]',
  imports: [CodeBlock, Button, ButtonGroup, Spinner, StepsButtons, NgIcon],
  providers: [provideIcons({ lucideZoomIn, lucideZoomOut, lucideSearch })],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Badge', path: '/docs/components/badge' }"
      [next]="{ label: 'Card', path: '/docs/components/card' }" />
    <h1 class="font-bold text-2xl">Button</h1>
    <div class="flex flex-col gap-4">
      <span>
        Button is an extension to standard HTML button element with additional
        features.
      </span>
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
                variant
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                '<b class="font-bold">primary</b>' | 'secondary' | 'ghost' |
                'outlined' | 'destructive'
              </td>
            </tr>
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
                squared
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                <b class="font-bold">false</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <button b-button variant="primary" size="md">This is a button</button>
      </div>
      <h2 class="font-semibold text-xl">Variants</h2>
      <code-block [code]="variantsUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <button b-button variant="primary">Primary</button>
        <button b-button variant="secondary">Secondary</button>
        <button b-button variant="ghost">Ghost</button>
        <button b-button variant="outlined">Outlined</button>
        <button b-button variant="destructive">Destructive</button>
      </div>
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <button b-button size="sm">Small</button>
        <button b-button size="md">Medium (default)</button>
        <button b-button size="lg">Large</button>
      </div>
      <h2 class="font-semibold text-xl">Loading State</h2>
      <code-block [code]="loadingUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <button b-button variant="ghost">
          <b-spinner size="sm" type="bars" />
          Saving
        </button>
      </div>
      <h2 class="font-semibold text-xl">Button Group</h2>
      <code-block [code]="buttonGroupUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-button-group>
          <button b-button variant="outlined">Outlined</button>
          <button b-button variant="outlined">Outlined</button>
          <button b-button variant="outlined">Outlined</button>
        </b-button-group>
      </div>
      <h3 class="font-semibold text-lg">All Primary</h3>
      <code-block [code]="allPrimaryUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-button-group>
          <button b-button variant="primary">Primary</button>
          <button b-button variant="primary">Primary</button>
          <button b-button variant="primary">Primary</button>
        </b-button-group>
      </div>
      <h3 class="font-semibold text-lg">Mixed Variants</h3>
      <code-block [code]="mixedVariantsUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-button-group>
          <button b-button variant="primary">Primary</button>
          <button b-button variant="secondary">Secondary</button>
        </b-button-group>
        <b-button-group>
          <button b-button variant="ghost">Ghost</button>
          <button b-button variant="outlined">Outlined</button>
        </b-button-group>
      </div>
      <h3 class="font-semibold text-lg">Small</h3>
      <code-block [code]="outlinedSmallUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-button-group>
          <button b-button variant="outlined" size="sm">Outlined</button>
          <button b-button variant="outlined" size="sm">Outlined</button>
          <button b-button variant="outlined" size="sm">Outlined</button>
        </b-button-group>
      </div>
      <h3 class="font-semibold text-lg">Spaced Buttons</h3>
      <code-block [code]="spacedUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-button-group [spaced]="true">
          <button b-button variant="outlined">Outlined</button>
          <button b-button variant="outlined">Outlined</button>
          <button b-button variant="outlined">Outlined</button>
        </b-button-group>
      </div>
      <h3 class="font-semibold text-lg">Spaced and Small Buttons</h3>
      <code-block [code]="spacedSmallUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <b-button-group [spaced]="true">
          <button b-button variant="outlined" size="sm">Outlined</button>
          <button b-button variant="outlined" size="sm">Outlined</button>
          <button b-button variant="outlined" size="sm">Outlined</button>
        </b-button-group>
      </div>
      <h2 class="font-semibold text-xl">Squared Buttons</h2>
      <code-block [code]="squaredUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <button b-button [squared]="true" size="sm">
          <ng-icon name="lucideZoomIn" size="14" color="currentColor" />
        </button>
        <button b-button [squared]="true" size="md">
          <ng-icon name="lucideZoomOut" size="16" color="currentColor" />
        </button>
        <button b-button [squared]="true" size="lg">
          <ng-icon name="lucideSearch" size="28" color="currentColor" />
        </button>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Badge', path: '/docs/components/badge' }"
      [next]="{ label: 'Card', path: '/docs/components/card' }" />
  `,
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class ButtonDocumentation {
  angularImport = `import { Button } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/button';`;
  basicUsage = `<button b-button variant="primary" size="md">This is a button</button>`;
  variantsUsage = `<button b-button variant="primary">Primary</button>\n<button b-button variant="secondary">Secondary</button>\n<button b-button variant="ghost">Ghost</button>\n<button b-button variant="outlined">Outlined</button>\n<button b-button variant="destructive">Destructive</button>`;
  sizesUsage = `<button b-button size="sm">Small</button>\n<button b-button size="md">Medium (default)</button>\n<button b-button size="lg">Large</button>`;
  loadingUsage = `<button b-button variant="ghost">\n  <b-spinner size="sm" type="bars" />\n  Saving\n</button>`;
  buttonGroupUsage = `<b-button-group>\n  <button b-button variant="outlined">Outlined</button>\n  <button b-button variant="outlined">Outlined</button>\n  <button b-button variant="outlined">Outlined</button>\n</b-button-group>`;
  allPrimaryUsage = `<b-button-group>\n  <button b-button variant="primary">Primary</button>\n  <button b-button variant="primary">Primary</button>\n  <button b-button variant="primary">Primary</button>\n</b-button-group>`;
  mixedVariantsUsage = `<b-button-group>\n  <button b-button variant="primary">Primary</button>\n  <button b-button variant="secondary">Secondary</button>\n</b-button-group>\n<b-button-group>\n  <button b-button variant="ghost">Ghost</button>\n  <button b-button variant="outlined">Outlined</button>\n</b-button-group>`;
  outlinedSmallUsage = `<b-button-group>\n  <button b-button variant="outlined" size="sm">Outlined</button>\n  <button b-button variant="outlined" size="sm">Outlined</button>\n  <button b-button variant="outlined" size="sm">Outlined</button>\n</b-button-group>`;
  spacedUsage = `<b-button-group [spaced]="true">\n  <button b-button variant="outlined">Outlined</button>\n  <button b-button variant="outlined">Outlined</button>\n  <button b-button variant="outlined">Outlined</button>\n</b-button-group>`;
  spacedSmallUsage = `<b-button-group [spaced]="true">\n  <button b-button variant="outlined" size="sm">Outlined</button>\n  <button b-button variant="outlined" size="sm">Outlined</button>\n  <button b-button variant="outlined" size="sm">Outlined</button>\n</b-button-group>`;
  squaredUsage = `<button b-button [squared]="true" size="sm">
  <ng-icon name="lucideZoomIn" size="14" color="currentColor" />
</button>
<button b-button [squared]="true" size="md">
  <ng-icon name="lucideZoomOut" size="16" color="currentColor" />
</button>
<button b-button [squared]="true" size="lg">
  <ng-icon name="lucideSearch" size="28" color="currentColor" />
</button>`;
}
