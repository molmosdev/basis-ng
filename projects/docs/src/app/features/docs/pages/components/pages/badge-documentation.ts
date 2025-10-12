import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { Badge, Alert } from '@basis-ng/primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';

@Component({
  selector: 'article[app-badge-documentation]',
  imports: [CodeBlock, Badge, StepsButtons, Alert],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Alert', path: '/docs/components/alert' }"
      [next]="{ label: 'Button', path: '/docs/components/button' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
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
      <h2 class="font-semibold text-xl">Basic</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4">
        <span b-badge class="b-variant-primary b-size-md">Primary Badge</span>
      </div>
      <h2 class="font-semibold text-xl">Variants</h2>
      <code-block [code]="variantsUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4">
        <span b-badge class="b-variant-primary">Primary</span>
        <span b-badge class="b-variant-secondary">Secondary</span>
        <span b-badge class="b-variant-ghost">Ghost</span>
        <span b-badge class="b-variant-outlined">Outlined</span>
        <span b-badge class="b-variant-destructive">Destructive</span>
      </div>
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4">
        <span b-badge class="b-size-sm">Small</span>
        <span b-badge class="b-size-md">Medium</span>
        <span b-badge class="b-size-lg">Large</span>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Alert', path: '/docs/components/alert' }"
      [next]="{ label: 'Button', path: '/docs/components/button' }" />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class BadgeDocumentation {
  angularImport = `import { Badge } from '@basis-ng/primitives' `;
  stylesImport = `@import '@basis-ng/styles/badge';`;
  basicUsage = `<span b-badge class="b-variant-primary b-size-md">Primary Badge</span>`;
  variantsUsage = `<span b-badge class="b-variant-primary">Primary</span>\n<span b-badge class="b-variant-secondary">Secondary</span>\n<span b-badge class="b-variant-ghost">Ghost</span>\n<span b-badge class="b-variant-outlined">Outlined</span>\n<span b-badge class="b-variant-destructive">Destructive</span>`;
  sizesUsage = `<span b-badge class="b-size-sm">Small</span>\n<span b-badge class="b-size-md">Medium</span>\n<span b-badge class="b-size-lg">Large</span>`;
}
