import { Component } from '@angular/core';
import { TabsComponent, TabComponent } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import { FormsModule } from '@angular/forms';

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

    <h2>Keyboard Navigation</h2>
    <span>
      Use the arrow keys to navigate between tabs. The component supports
      horizontal navigation.
    </span>`,
  standalone: true,
  imports: [TabsComponent, TabComponent, CodeBlockComponent, FormsModule],
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
}
