import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkListbox } from '@angular/cdk/listbox';
import { Component, computed, contentChildren, inject, OnInit } from '@angular/core';
import { Tab } from './tab';

/**
 * Tabs container that manages keyboard navigation and active tab state.
 */
@Component({
  selector: 'b-tabs',
  imports: [],
  template: ` <ng-content /> `,
  hostDirectives: [CdkListbox],
  host: {
    '(keydown.arrowLeft)': 'previousTab()',
    '(keydown.arrowUp)': 'previousTab()',
    '(keydown.arrowRight)': 'nextTab()',
    '(keydown.arrowDown)': 'nextTab()',
  },
})
export class Tabs implements OnInit {
  /**
   * Injected CDK listbox used for accessibility behavior.
   */
  cdkListbox = inject(CdkListbox);

  /**
   * Query list of Tab child components.
   */
  readonly tabs = contentChildren(Tab);

  /**
   * Computed array of underlying CDK options for navigation.
   */
  readonly cdkOptions = computed(() => this.tabs().map((tab) => tab.cdkOption));

  /**
   * Keyboard manager that handles arrow navigation between tabs.
   */
  readonly listKeyManager = computed(() =>
    new ActiveDescendantKeyManager(this.cdkOptions()).withWrap().withHorizontalOrientation('ltr'),
  );

  /**
   * Move highlight to the previous tab.
   */
  previousTab() {
    this.listKeyManager().setPreviousItemActive();
  }

  /**
   * Move highlight to the next tab.
   */
  nextTab() {
    this.listKeyManager().setNextItemActive();
  }

  /**
   * Initialize CDK listbox behaviors on component init.
   */
  ngOnInit(): void {
    this.cdkListbox.useActiveDescendant = true;
    this.cdkListbox.orientation = 'horizontal';
  }
}
