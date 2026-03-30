import { Component, signal } from '@angular/core';
import { Tabs, Tab, Alert } from '@basis-ng/primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-tabs-documentation]',
  standalone: true,
  imports: [CodeBlock, Tabs, Tab, StepsButtons, Alert],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Switch', path: '/docs/components/switch' }"
      [next]="{ label: 'Textarea', path: '/docs/components/textarea' }"
    />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback! Expect breaking
      changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Tabs</h1>
    <div class="flex flex-col gap-4">
      <span>A collection of related content sections, only one of which is visible at a time.</span>
      <code-block [code]="angularImport" />
      <span>Include this to apply predefined styles. The component is headless without it.</span>
      <code-block [code]="stylesImport" />

      <h2 class="font-semibold text-xl">Basic Usage</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-8 mb-6 flex justify-center bg-surface"
      >
        <b-tabs [(value)]="selectedTab">
          <button b-tab value="tab1">Tab 1</button>
          <button b-tab value="tab2">Tab 2</button>
          <button b-tab value="tab3">Tab 3</button>
        </b-tabs>
      </div>

      <h2 class="font-semibold text-xl">Rounded Full (Pill)</h2>
      <p class="text-sm text-neutral-500 font-medium">
        Use the <code>b-rounded-full</code> class for a pill-shaped design, perfect for navigation
        actions.
      </p>
      <code-block [code]="roundedUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-8 mb-6 flex justify-center bg-surface"
      >
        <b-tabs [(value)]="roundedTab" class="b-rounded-full">
          <button b-tab value="tab1">Experience</button>
          <button b-tab value="tab2">Education</button>
        </b-tabs>
      </div>

      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-8 mb-6 flex flex-col gap-6 items-center bg-surface"
      >
        <b-tabs [(value)]="sizesTab" class="b-size-sm">
          <button b-tab value="tab1">Small</button>
          <button b-tab value="tab2">Small</button>
          <button b-tab value="tab3">Small</button>
        </b-tabs>
        <b-tabs [(value)]="sizesTab" class="b-size-md">
          <button b-tab value="tab1">Medium (default)</button>
          <button b-tab value="tab2">Medium (default)</button>
          <button b-tab value="tab3">Medium (default)</button>
        </b-tabs>
        <b-tabs [(value)]="sizesTab" class="b-size-lg">
          <button b-tab value="tab1">Large</button>
          <button b-tab value="tab2">Large</button>
          <button b-tab value="tab3">Large</button>
        </b-tabs>
      </div>

      <h2 class="font-semibold text-xl">Lazy Loading Content</h2>
      <code-block [code]="lazyLoadingUsage" />
      <div class="border border-gray-200 dark:border-neutral-900 rounded-lg p-8 mb-6 bg-surface">
        <b-tabs [(value)]="lazySelectedTab">
          <button b-tab value="tab1">Tab 1</button>
          <button b-tab value="tab2">Tab 2</button>
          <button b-tab value="tab3">Tab 3</button>
        </b-tabs>

        <div
          class="mt-8 p-6 border border-gray-200 dark:border-neutral-900 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 min-h-32"
        >
          @if (lazySelectedTab()[0] === 'tab1') {
            <div class="animate-in fade-in slide-in-from-top-2 duration-300">
              <h3 class="font-bold mb-2">Content for Tab 1</h3>
              <p class="text-sm text-neutral-500">
                This content is only rendered when Tab 1 is active.
              </p>
            </div>
          } @else if (lazySelectedTab()[0] === 'tab2') {
            <div class="animate-in fade-in slide-in-from-top-2 duration-300">
              <h3 class="font-bold mb-2">Content for Tab 2</h3>
              <p class="text-sm text-neutral-500">
                This content is only rendered when Tab 2 is active.
              </p>
            </div>
          } @else {
            <div class="animate-in fade-in slide-in-from-top-2 duration-300">
              <h3 class="font-bold mb-2">Content for Tab 3</h3>
              <p class="text-sm text-neutral-500">
                This content is only rendered when Tab 3 is active.
              </p>
            </div>
          }
        </div>
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Switch', path: '/docs/components/switch' }"
      [next]="{ label: 'Textarea', path: '/docs/components/textarea' }"
    />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class: 'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class TabsDocumentation {
  selectedTab = signal(['tab1']);
  lazySelectedTab = signal(['tab1']);
  sizesTab = signal(['tab1']);
  roundedTab = signal(['tab1']);

  angularImport = `import { Tabs, Tab } from '@basis-ng/primitives' `;
  stylesImport = `@import '@basis-ng/styles/tabs';`;

  basicUsage = `<b-tabs [(value)]='selectedTab'>
  <button b-tab value='tab1'>Tab 1</button>
  <button b-tab value='tab2'>Tab 2</button>
  <button b-tab value='tab3'>Tab 3</button>
</b-tabs>`;

  roundedUsage = `<b-tabs [(value)]='activeTab' class='b-rounded-full'>
  <button b-tab value='tab1'>Experience</button>
  <button b-tab value='tab2'>Education</button>
</b-tabs>`;

  lazyLoadingUsage = `<b-tabs [(value)]='lazySelectedTab'>
  <button b-tab value='tab1'>Tab 1</button>
  <button b-tab value='tab2'>Tab 2</button>
  <button b-tab value='tab3'>Tab 3</button>
</b-tabs>

@if (lazySelectedTab()[0] === 'tab1') {
  <div>Tab 1 Content</div>
} ...`;

  sizesUsage = `<b-tabs [(value)]='sizesTab' class='b-size-sm'>
  <button b-tab value='tab1'>Small</button>
</b-tabs>

<b-tabs [(value)]='sizesTab' class='b-size-md'>
  <button b-tab value='tab1'>Medium (default)</button>
</b-tabs>

<b-tabs [(value)]='sizesTab' class='b-size-lg'>
  <button b-tab value='tab1'>Large</button>
</b-tabs>`;
}
