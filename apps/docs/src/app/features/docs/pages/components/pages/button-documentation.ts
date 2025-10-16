import { Component } from '@angular/core';
import { Alert, Button, ButtonGroup, Spinner } from '@basis-ng/primitives';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideRocket, lucideSearch, lucideZoomIn, lucideZoomOut } from '@ng-icons/lucide';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-button-documentation]',
  imports: [CodeBlock, Button, ButtonGroup, Spinner, StepsButtons, NgIcon, Alert],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Badge', path: '/docs/components/badge' }"
      [next]="{ label: 'Card', path: '/docs/components/card' }"
    />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback! Expect breaking
      changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Button</h1>
    <div class="flex flex-col gap-4">
      <span>Button is an extension to standard HTML button element with additional features.</span>
      <code-block [code]="angularImport" />
      <span>Include this to apply predefined styles. The component is headless without it.</span>
      <code-block [code]="stylesImport" />

      <h2 class="font-semibold text-xl">Default</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button>Click me</button>
      </div>
      <h2 class="font-semibold text-xl">Variants</h2>
      <code-block [code]="variantsUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button class="b-variant-primary">Primary</button>
        <button b-button class="b-variant-secondary">Secondary</button>
        <button b-button class="b-variant-ghost">Ghost</button>
        <button b-button class="b-variant-outlined">Outlined</button>
        <button b-button class="b-variant-destructive">Destructive</button>
      </div>
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button class="b-size-sm">Small</button>
        <button b-button class="b-size-md">Medium</button>
        <button b-button class="b-size-lg">Large</button>
      </div>
      <h2 class="font-semibold text-xl">Loading State</h2>
      <code-block [code]="loadingUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button class="b-variant-ghost">
          <b-spinner size="sm" type="bars" />
          Saving
        </button>
      </div>
      <h2 class="font-semibold text-xl">Button Group</h2>
      <code-block [code]="buttonGroupUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <b-button-group>
          <button b-button class="b-variant-outlined">Outlined</button>
          <button b-button class="b-variant-outlined">Outlined</button>
          <button b-button class="b-variant-outlined">Outlined</button>
        </b-button-group>
      </div>
      <h3 class="font-semibold text-lg">All Primary</h3>
      <code-block [code]="allPrimaryUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <b-button-group>
          <button b-button class="b-variant-primary">Primary</button>
          <button b-button class="b-variant-primary">Primary</button>
          <button b-button class="b-variant-primary">Primary</button>
        </b-button-group>
      </div>
      <h3 class="font-semibold text-lg">Mixed Variants</h3>
      <code-block [code]="mixedVariantsUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <b-button-group>
          <button b-button class="b-variant-primary">Primary</button>
          <button b-button class="b-variant-secondary">Secondary</button>
        </b-button-group>
        <b-button-group>
          <button b-button class="b-variant-ghost">Ghost</button>
          <button b-button class="b-variant-outlined">Outlined</button>
        </b-button-group>
      </div>
      <h3 class="font-semibold text-lg">Small</h3>
      <code-block [code]="outlinedSmallUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <b-button-group>
          <button b-button class="b-variant-outlined b-size-sm">Outlined</button>
          <button b-button class="b-variant-outlined b-size-sm">Outlined</button>
          <button b-button class="b-variant-outlined b-size-sm">Outlined</button>
        </b-button-group>
      </div>
      <h3 class="font-semibold text-lg">Spaced Buttons</h3>
      <code-block [code]="spacedUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <b-button-group [spaced]="true">
          <button b-button class="b-variant-outlined">Outlined</button>
          <button b-button class="b-variant-outlined">Outlined</button>
          <button b-button class="b-variant-outlined">Outlined</button>
        </b-button-group>
      </div>
      <h3 class="font-semibold text-lg">Spaced and Small Buttons</h3>
      <code-block [code]="spacedSmallUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <b-button-group [spaced]="true">
          <button b-button class="b-variant-outlined b-size-sm">Outlined</button>
          <button b-button class="b-variant-outlined b-size-sm">Outlined</button>
          <button b-button class="b-variant-outlined b-size-sm">Outlined</button>
        </b-button-group>
      </div>
      <h2 class="font-semibold text-xl">Squared Buttons</h2>
      <code-block [code]="squaredUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
      >
        <button b-button class="b-squared b-size-sm">
          <ng-icon name="lucideZoomIn" size="14" color="currentColor" />
        </button>
        <button b-button class="b-squared b-size-md">
          <ng-icon name="lucideZoomOut" size="16" color="currentColor" />
        </button>
        <button b-button class="b-squared b-size-lg">
          <ng-icon name="lucideSearch" size="28" color="currentColor" />
        </button>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Badge', path: '/docs/components/badge' }"
      [next]="{ label: 'Card', path: '/docs/components/card' }"
    />
  `,
  providers: [provideIcons({ lucideZoomIn, lucideZoomOut, lucideSearch, lucideRocket })],
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class ButtonDocumentation {
  angularImport = `import { Button } from '@basis-ng/primitives' `;
  stylesImport = `@import '@basis-ng/styles/button';`;
  basicUsage = `<button b-button>\n  Click me\n</button>`;
  variantsUsage = `<button b-button class="b-variant-primary">Primary</button>\n<button b-button class="b-variant-secondary">Secondary</button>\n<button b-button class="b-variant-ghost">Ghost</button>\n<button b-button class="b-variant-outlined">Outlined</button>\n<button b-button class="b-variant-destructive">Destructive</button>`;
  sizesUsage = `<button b-button class="b-size-sm">Small</button>\n<button b-button class="b-size-md">Medium</button>\n<button b-button class="b-size-lg">Large</button>`;
  loadingUsage = `<button b-button class="b-variant-ghost">\n  <b-spinner size="sm" type="bars" />\n  Saving\n</button>`;
  buttonGroupUsage = `<b-button-group>\n  <button b-button class="b-variant-outlined">Outlined</button>\n  <button b-button class="b-variant-outlined">Outlined</button>\n  <button b-button class="b-variant-outlined">Outlined</button>\n</b-button-group>`;
  allPrimaryUsage = `<b-button-group>\n  <button b-button class="b-variant-primary">Primary</button>\n  <button b-button class="b-variant-primary">Primary</button>\n  <button b-button class="b-variant-primary">Primary</button>\n</b-button-group>`;
  mixedVariantsUsage = `<b-button-group>\n  <button b-button class="b-variant-primary">Primary</button>\n  <button b-button class="b-variant-secondary">Secondary</button>\n</b-button-group>\n<b-button-group>\n  <button b-button class="b-variant-ghost">Ghost</button>\n  <button b-button class="b-variant-outlined">Outlined</button>\n</b-button-group>`;
  outlinedSmallUsage = `<b-button-group>\n  <button b-button class="b-variant-outlined b-size-sm">Outlined</button>\n  <button b-button class="b-variant-outlined b-size-sm">Outlined</button>\n  <button b-button class="b-variant-outlined b-size-sm">Outlined</button>\n</b-button-group>`;
  spacedUsage = `<b-button-group [spaced]="true">\n  <button b-button class="b-variant-outlined">Outlined</button>\n  <button b-button class="b-variant-outlined">Outlined</button>\n  <button b-button class="b-variant-outlined">Outlined</button>\n</b-button-group>`;
  spacedSmallUsage = `<b-button-group [spaced]="true">\n  <button b-button class="b-variant-outlined b-size-sm">Outlined</button>\n  <button b-button class="b-variant-outlined b-size-sm">Outlined</button>\n  <button b-button class="b-variant-outlined b-size-sm">Outlined</button>\n</b-button-group>`;
  squaredUsage = `<button b-button class="b-squared b-size-sm">\n  <ng-icon name="lucideZoomIn" size="14" color="currentColor" />\n</button>\n<button b-button class="b-squared b-size-md">\n  <ng-icon name="lucideZoomOut" size="16" color="currentColor" />\n</button>\n<button b-button class="b-squared b-size-lg">\n  <ng-icon name="lucideSearch" size="28" color="currentColor" />\n</button>`;
}
