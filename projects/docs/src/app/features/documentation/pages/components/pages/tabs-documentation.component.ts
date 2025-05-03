import { Component } from '@angular/core';
import {
  TabsComponent,
  TabComponent,
} from '../../../../../../../../primitives/src/public-api';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'article[app-tabs-documentation]',
  template: `<h1>Tabs</h1>
    <span>
      The Tabs component provides a way to organize content into multiple views
      that can be switched between.
    </span>

    <code-block [code]="angularImport" />
    <span
      >Include this to apply predefined styles. The component is headless
      without it.</span
    >
    <code-block [code]="stylesImport" />

    <h2>Keyboard Navigation</h2>
    <span>
      Use the arrow keys to navigate between tabs. The component supports
      horizontal navigation.
    </span>

    <h2>Basic Usage</h2>
    <code-block [code]="basicUsage" />
    <div
      class="documentation-playground"
      style="flex-direction: column; align-items: center;">
      <b-tabs [(ngModel)]="selectedTab">
        <b-tab value="tab1">Tab 1</b-tab>
        <b-tab value="tab2">Tab 2</b-tab>
        <b-tab value="tab3">Tab 3</b-tab>
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
      }
    </div>

    <h2>Lazy Loading Usage</h2>
    <span> Use <code>ng-template</code> to lazily load tab content. </span>
    <code-block [code]="lazyLoadingUsage" />
    <div
      class="documentation-playground"
      style="flex-direction: column; align-items: center;">
      <b-tabs [(ngModel)]="lazySelectedTab">
        <b-tab value="tab1">Tab 1</b-tab>
        <b-tab value="tab2">Tab 2</b-tab>
        <b-tab value="tab3">Tab 3</b-tab>
      </b-tabs>
      @switch (lazySelectedTab[0]) {
        @case ('tab1') {
          <ng-container *ngTemplateOutlet="tab1Content" />
        }
        @case ('tab2') {
          <ng-container *ngTemplateOutlet="tab2Content" />
        }
        @case ('tab3') {
          <ng-container *ngTemplateOutlet="tab3Content" />
        }
      }
    </div>

    <ng-template #tab1Content>
      <p>Lazy-loaded content for Tab 1</p>
    </ng-template>
    <ng-template #tab2Content>
      <p>Lazy-loaded content for Tab 2</p>
    </ng-template>
    <ng-template #tab3Content>
      <p>Lazy-loaded content for Tab 3</p>
    </ng-template> `,
  standalone: true,
  imports: [
    TabsComponent,
    TabComponent,
    CodeBlockComponent,
    FormsModule,
    NgTemplateOutlet,
  ],
})
export default class TabsDocumentationComponent {
  angularImport = `import { TabsComponent, TabComponent } from '@basis-ng/primitives';`;

  stylesImport = `@import '@basis-ng/styles/tabs';
@import '@basis-ng/styles/tab';`;

  basicUsage = `<b-tabs [(ngModel)]="selectedTab">
  <b-tab value="tab1">Tab 1</b-tab>
  <b-tab value="tab2">Tab 2</b-tab>
  <b-tab value="tab3">Tab 3</b-tab>
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

  lazyLoadingUsage = `<b-tabs [(ngModel)]="lazySelectedTab">
  <b-tab value="tab1">Tab 1</b-tab>
  <b-tab value="tab2">Tab 2</b-tab>
  <b-tab value="tab3">Tab 3</b-tab>
</b-tabs>

@switch (lazySelectedTab[0]) {
  @case ('tab1') {
    <ng-container *ngTemplateOutlet="tab1Content"></ng-container>
  }
  @case ('tab2') {
    <ng-container *ngTemplateOutlet="tab2Content"></ng-container>
  }
  @case ('tab3') {
    <ng-container *ngTemplateOutlet="tab3Content"></ng-container>
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

  lazySelectedTab = ['tab1'];
}
