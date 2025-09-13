import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { Badge } from '@basis-ng/primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';

@Component({
  selector: 'article[app-badge-documentation]',
  imports: [CodeBlock, Badge, StepsButtons],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Alert', path: '/docs/components/alert' }"
      [next]="{ label: 'Button', path: '/docs/components/button' }" />
    <h1 class="font-bold text-2xl">Badge</h1>
    <div class="flex flex-col gap-4">
      <span>
        Badge is a small component used to display additional information or
        status.
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
                'primary' | 'secondary' | 'ghost' | 'outlined' | 'destructive'
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                size
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                'sm' | 'md' | 'lg'
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <span b-badge variant="primary" size="md">Primary Badge</span>
      </div>
      <h2 class="font-semibold text-xl">Variants</h2>
      <code-block [code]="variantsUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <span b-badge variant="primary">Primary</span>
        <span b-badge variant="secondary">Secondary</span>
        <span b-badge variant="ghost">Ghost</span>
        <span b-badge variant="outlined">Outlined</span>
        <span b-badge variant="destructive">Destructive</span>
      </div>
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <span b-badge size="sm">Small</span>
        <span b-badge size="md">Medium</span>
        <span b-badge size="lg">Large</span>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Alert', path: '/docs/components/alert' }"
      [next]="{ label: 'Button', path: '/docs/components/button' }" />
  `,
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class BadgeDocumentation {
  angularImport = `import { BadgeComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/badge';`;
  basicUsage = `<span b-badge variant="primary" size="md">Primary Badge</span>`;
  variantsUsage = `<span b-badge variant="primary">Primary</span>\n<span b-badge variant="secondary">Secondary</span>\n<span b-badge variant="ghost">Ghost</span>\n<span b-badge variant="outlined">Outlined</span>\n<span b-badge variant="destructive">Destructive</span>`;
  sizesUsage = `<span b-badge size="sm">Small</span>\n<span b-badge size="md">Medium</span>\n<span b-badge size="lg">Large</span>`;
}
