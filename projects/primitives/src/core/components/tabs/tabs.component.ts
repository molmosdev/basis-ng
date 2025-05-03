import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkListbox } from '@angular/cdk/listbox';
import {
  Component,
  computed,
  contentChildren,
  inject,
  OnInit,
} from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'b-tabs',
  imports: [],
  template: `<ng-content />`,
  hostDirectives: [CdkListbox],
  host: {
    '(keydown.arrowLeft)': 'previousTab()',
    '(keydown.arrowUp)': 'previousTab()',
    '(keydown.arrowRight)': 'nextTab()',
    '(keydown.arrowDown)': 'nextTab()',
  },
})
export class TabsComponent implements OnInit {
  /**
   * Reference to the injected CDK Listbox instance.
   */
  cdkListbox = inject(CdkListbox);
  /**
   * Collection of child options within the listbox.
   */
  readonly tabs = contentChildren(TabComponent);

  /**
   * Collection of cdk options within the listbox.
   */
  readonly cdkOptions = computed(() => this.tabs().map(tab => tab.cdkOption));

  /**
   * Key manager for handling keyboard navigation and active descendant management.
   */
  readonly listKeyManager = computed(() =>
    new ActiveDescendantKeyManager(this.cdkOptions())
      .withWrap()
      .withHorizontalOrientation('ltr')
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
