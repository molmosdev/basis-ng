import { Component, computed, effect, ElementRef, inject, input, signal } from '@angular/core';
import { Tabs } from './tabs';

/**
 * A single tab within a tabs list.
 */
@Component({
  selector: 'b-tab',
  imports: [],
  template: ` <ng-content /> `,
  host: {
    '[attr.role]': '"tab"',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.tabindex]': 'isSelected() ? 0 : -1',
    '(click)': 'onClick()',
  },
})
export class Tab {
  /**
   * Parent tabs container.
   */
  private tabs = inject(Tabs);

  /**
   * Host element reference.
   */
  private el = inject(ElementRef);

  /**
   * Unique value identifying this tab.
   */
  readonly value = input.required<string>();

  /**
   * Internal signal tracking selection state.
   */
  private readonly selected = signal(false);

  /**
   * Whether this tab is currently selected.
   */
  readonly isSelected = computed(() => this.selected());

  constructor() {
    // Focus this tab when it becomes selected
    effect(() => {
      if (this.isSelected()) {
        this.el.nativeElement.focus();
      }
    });
  }

  /**
   * Set the selected state of this tab.
   */
  setSelected(selected: boolean) {
    this.selected.set(selected);
  }

  /**
   * Handle click events to select this tab.
   */
  onClick() {
    this.tabs.selectTab(this.value());
  }
}
