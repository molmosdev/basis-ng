import { Component, computed, ElementRef, inject, input, OnDestroy } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Tabs } from './tabs';
import { Tab as AriaTab } from '@angular/aria/tabs';

/**
 * A single tab within a tabs list.
 */
@Component({
  selector: 'b-tab',
  imports: [],
  hostDirectives: [
    {
      directive: AriaTab,
      inputs: ['value'],
    },
  ],
  template: ` <ng-content /> `,
  host: {
    '(click)': 'onClick()',
  },
})
export class Tab implements OnDestroy {
  /**
   * Parent tabs container.
   */
  private tabsContainer = inject(Tabs);

  /**
   * Host element reference.
   */
  readonly el = inject(ElementRef);

  /**
   * Unique value identifying this tab.
   */
  readonly value = input.required<string>();

  private focusMonitor = inject(FocusMonitor);

  constructor() {
    this.focusMonitor.monitor(this.el);
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.el);
  }

  /**
   * Whether this tab is currently selected.
   */
  readonly isSelected = computed(() => this.value() === this.tabsContainer.value()[0]);

  /**
   * Handle click events to select this tab.
   */
  onClick() {
    this.tabsContainer.selectTab(this.value());
  }
}
