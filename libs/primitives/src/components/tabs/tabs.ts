import { Component, computed, contentChildren, effect, model, output } from '@angular/core';
import { Tab } from './tab';

/**
 * Tabs container that manages keyboard navigation and active tab state.
 */
@Component({
  selector: 'b-tabs',
  imports: [],
  template: ` <ng-content /> `,
  host: {
    '[attr.role]': '"tablist"',
    '(keydown.arrowLeft)': 'previousTab()',
    '(keydown.arrowRight)': 'nextTab()',
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

  /**
   * Computed index of currently active tab.
   */
  readonly activeIndex = computed(() => {
    const currentValue = this.value()[0];
    return this.tabs().findIndex((tab) => tab.value() === currentValue);
  });

  constructor() {
    // Sync tab selection with child tabs
    effect(() => {
      const selectedValues = this.value();
      this.tabs().forEach((tab) => {
        tab.setSelected(selectedValues.includes(tab.value()));
      });
    });
  }

  /**
   * Move highlight to the previous tab.
   */
  previousTab() {
    const currentIndex = this.activeIndex();
    const tabs = this.tabs();
    if (tabs.length === 0) return;

    const newIndex = currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1;
    this.selectTab(tabs[newIndex].value());
  }

  /**
   * Move highlight to the next tab.
   */
  nextTab() {
    const currentIndex = this.activeIndex();
    const tabs = this.tabs();
    if (tabs.length === 0) return;

    const newIndex = currentIndex >= tabs.length - 1 ? 0 : currentIndex + 1;
    this.selectTab(tabs[newIndex].value());
  }

  /**
   * Select a tab by its value.
   */
  selectTab(tabValue: string) {
    this.value.set([tabValue]);
    this.valueChange.emit([tabValue]);
  }
}
