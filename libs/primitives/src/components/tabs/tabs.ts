import { Component, contentChildren, effect, inject, model, output } from '@angular/core';
import { Tab } from './tab';
import { Tabs as AriaTabs, TabList } from '@angular/aria/tabs';

/**
 * Tabs container that manages keyboard navigation and active tab state.
 */
@Component({
  selector: 'b-tabs',
  imports: [],
  hostDirectives: [
    {
      directive: AriaTabs,
    },
    {
      directive: TabList,
      inputs: ['selectionMode', 'selectedTab'],
      outputs: ['selectedTabChange'],
    },
  ],
  template: ` <ng-content /> `,
  host: {
    selectionMode: 'follow',
    '(selectedTabChange)': 'onSelectionChange($event)',
  },
})
export class Tabs {
  /**
   * Current selected tab value(s).
   */
  readonly value = model<string[]>([]);

  /**
   * Output emitted when the tab selection changes.
   */
  readonly valueChange = output<string[]>();

  /**
   * Query list of Tab child components.
   */
  readonly tabs = contentChildren(Tab);

  private tabList = inject(TabList);

  constructor() {
    // Sync external model selection changes back to the underlying aria TabList
    effect(() => {
      const selectedValues = this.value();
      if (selectedValues.length > 0) {
        this.tabList.selectedTab.set(selectedValues[0]);
      } else {
        this.tabList.selectedTab.set(undefined);
      }
    });
  }

  onSelectionChange(selectedValue: string | undefined) {
    if (selectedValue !== undefined) {
      if (this.value()[0] !== selectedValue) {
        this.value.set([selectedValue]);
        this.valueChange.emit([selectedValue]);

        // If a tab is selected via keyboard logic in "follow" mode, trigger an actual click
        // so that potential bindings like [routerLink] embedded in the tabs still activate naturally.
        const tab = this.tabs().find((t) => t.value() === selectedValue);
        if (tab?.el.nativeElement) {
          tab.el.nativeElement.click();
        }
      }
    }
  }

  /**
   * Select a tab by its value.
   */
  selectTab(tabValue: string) {
    this.value.set([tabValue]);
    this.valueChange.emit([tabValue]);
  }
}
