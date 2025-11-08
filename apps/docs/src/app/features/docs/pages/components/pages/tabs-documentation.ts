import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { Alert, Badge, Tab, Tabs } from '../../../../../../../../../libs/primitives/src/public-api';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { CodeBlock } from '../shared/components/code-block';

@Component({
  selector: 'article[app-tabs-documentation]',
  imports: [Tabs, Tab, CodeBlock, NgTemplateOutlet, StepsButtons, Badge, Alert],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Switch', path: '/docs/components/switch' }"
      [next]="{ label: 'Textarea', path: '/docs/components/textarea' }"
    />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback! Expect breaking
      changes!
    </b-alert>
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      Tabs
      <span b-badge class="b-variant-outlined b-size-sm">New</span>
    </h1>
    <div class="flex flex-col gap-4">
      <span>
        The Tabs component provides a way to organize content into multiple views that can be
        switched between. Built with signals for reactive state management and keyboard navigation
        support.
      </span>
      <code-block [code]="angularImport" />
      <span>Include this to apply predefined styles. The component is headless without it.</span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Tabs properties</h2>
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
                <b class="font-bold">[]</b>
                | ModelSignal&lt;string[]&gt;
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
                OutputEmitterRef&lt;string[]&gt;
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Tab properties</h2>
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
                <b class="font-bold">required</b>
                | InputSignal&lt;string&gt;
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Keyboard Navigation</h2>
      <span>
        Use the arrow keys to navigate between tabs. Press Arrow Left to move to previous tab, Arrow
        Right to move to next tab.
      </span>
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-4 items-center"
      >
        <b-tabs [(value)]="sizesTab" class="b-size-sm">
          <b-tab value="tab1">Small</b-tab>
          <b-tab value="tab2">Small</b-tab>
          <b-tab value="tab3">Small</b-tab>
        </b-tabs>
        <b-tabs [(value)]="sizesTab" class="b-size-md">
          <b-tab value="tab1">Medium (default)</b-tab>
          <b-tab value="tab2">Medium (default)</b-tab>
          <b-tab value="tab3">Medium (default)</b-tab>
        </b-tabs>
        <b-tabs [(value)]="sizesTab" class="b-size-lg">
          <b-tab value="tab1">Large</b-tab>
          <b-tab value="tab2">Large</b-tab>
          <b-tab value="tab3">Large</b-tab>
        </b-tabs>
      </div>
      <h2 class="font-semibold text-xl">Basic Usage</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-4 items-center"
      >
        <b-tabs [(value)]="selectedTab">
          <b-tab value="tab1">Tab 1</b-tab>
          <b-tab value="tab2">Tab 2</b-tab>
          <b-tab value="tab3">Tab 3</b-tab>
        </b-tabs>
        @if (selectedTab[0] === 'tab1') {
          <p>Tab 1 content</p>
        }
        @if (selectedTab[0] === 'tab2') {
          <p>Tab 2 content</p>
        }
        @if (selectedTab[0] === 'tab3') {
          <p>Tab 3 content</p>
        }
      </div>
      <h2 class="font-semibold text-xl">Lazy Loading Usage</h2>
      <span>
        Use
        <code>ng-template</code>
        to lazily load tab content.
      </span>
      <code-block [code]="lazyLoadingUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-4 items-center"
      >
        <b-tabs [(value)]="lazySelectedTab">
          <b-tab value="tab1">Tab 1</b-tab>
          <b-tab value="tab2">Tab 2</b-tab>
          <b-tab value="tab3">Tab 3</b-tab>
        </b-tabs>
        @if (lazySelectedTab[0] === 'tab1') {
          <ng-container *ngTemplateOutlet="tab1Content" />
        }
        @if (lazySelectedTab[0] === 'tab2') {
          <ng-container *ngTemplateOutlet="tab2Content" />
        }
        @if (lazySelectedTab[0] === 'tab3') {
          <ng-container *ngTemplateOutlet="tab3Content" />
        }
        <ng-template #tab1Content>
          <p>Lazy-loaded content for Tab 1</p>
        </ng-template>
        <ng-template #tab2Content>
          <p>Lazy-loaded content for Tab 2</p>
        </ng-template>
        <ng-template #tab3Content>
          <p>Lazy-loaded content for Tab 3</p>
        </ng-template>
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
  angularImport = `import { Tabs, Tab } from '@basis-ng/primitives' `;
  stylesImport = `@import '@basis-ng/styles/tabs';`;
  basicUsage = `<b-tabs [(value)]='selectedTab'>
  <b-tab value='tab1'>Tab 1</b-tab>
  <b-tab value='tab2'>Tab 2</b-tab>
  <b-tab value='tab3'>Tab 3</b-tab>
</b-tabs>

@switch (selectedTab[0]) {
  @case ('tab1') {
    <p>Tab 1 content</p>
  }
  @case ('tab2') {
    <p>Tab 2 content</p>
  }
  @case ('tab3') {
    <p>Tab 3 content</p>
  }
}`;
  selectedTab = ['tab2'];
  lazySelectedTab = ['tab1'];
  sizesTab = ['tab1'];
  lazyLoadingUsage = `<b-tabs [(value)]='lazySelectedTab'>
  <b-tab value='tab1'>Tab 1</b-tab>
  <b-tab value='tab2'>Tab 2</b-tab>
  <b-tab value='tab3'>Tab 3</b-tab>
</b-tabs>

@switch (lazySelectedTab[0]) {
  @case ('tab1') {
    <ng-container *ngTemplateOutlet='tab1Content'></ng-container>
  }
  @case ('tab2') {
    <ng-container *ngTemplateOutlet='tab2Content'></ng-container>
  }
  @case ('tab3') {
    <ng-container *ngTemplateOutlet='tab3Content'></ng-container>
  }
}

<ng-template #tab1Content>
  <p>Lazy-loaded content for Tab 1</p>
</ng-template>
<ng-template #tab2Content>
  <p>Lazy-loaded content for Tab 2</p>
</ng-template>
<ng-template #tab3Content>
  <p>Lazy-loaded content for Tab 3</p>
</ng-template>`;
  sizesUsage = `<b-tabs [(value)]='sizesTab' class='b-size-sm'>
  <b-tab value='tab1'>Small</b-tab>
  <b-tab value='tab2'>Small</b-tab>
  <b-tab value='tab3'>Small</b-tab>
</b-tabs>
<b-tabs [(value)]='sizesTab' class='b-size-md'>
  <b-tab value='tab1'>Medium (default)</b-tab>
  <b-tab value='tab2'>Medium (default)</b-tab>
  <b-tab value='tab3'>Medium (default)</b-tab>
</b-tabs>
<b-tabs [(value)]='sizesTab' class='b-size-lg'>
  <b-tab value='tab1'>Large</b-tab>
  <b-tab value='tab2'>Large</b-tab>
  <b-tab value='tab3'>Large</b-tab>
</b-tabs>`;
}
