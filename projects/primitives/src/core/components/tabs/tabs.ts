import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkListbox } from '@angular/cdk/listbox';
import { Component, computed, contentChildren, inject, OnInit } from '@angular/core';
import { Tab } from './tab';

@Component({
  selector: 'b-tabs',
  imports: [],
  template: `
    <ng-content />
  `,
  hostDirectives: [CdkListbox],
  host: {
    '(keydown.arrowLeft)': 'previousTab()',
    '(keydown.arrowUp)': 'previousTab()',
    '(keydown.arrowRight)': 'nextTab()',
    '(keydown.arrowDown)': 'nextTab()',
  },
})
export class Tabs implements OnInit {
  cdkListbox = inject(CdkListbox);
  readonly tabs = contentChildren(Tab);
  readonly cdkOptions = computed(() => this.tabs().map((tab) => tab.cdkOption));
  readonly listKeyManager = computed(() =>
    new ActiveDescendantKeyManager(this.cdkOptions()).withWrap().withHorizontalOrientation('ltr'),
  );

  previousTab() {
    this.listKeyManager().setPreviousItemActive();
  }

  nextTab() {
    this.listKeyManager().setNextItemActive();
  }

  ngOnInit(): void {
    this.cdkListbox.useActiveDescendant = true;
    this.cdkListbox.orientation = 'horizontal';
  }
}
