import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CdkListbox } from '@angular/cdk/listbox';
import {
  Component,
  computed,
  contentChildren,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { Tab } from './tab';

/**
 * Defines the available sizes for the button component.
 * @public
 */
type TabsSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'b-tabs',
  imports: [],
  template: `<ng-content />`,
  hostDirectives: [CdkListbox],
  host: {
    '[class.b-size-sm]': 'size() === "sm"',
    '[class.b-size-md]': 'size() === "md"',
    '[class.b-size-lg]': 'size() === "lg"',
    '(keydown.arrowLeft)': 'previousTab()',
    '(keydown.arrowUp)': 'previousTab()',
    '(keydown.arrowRight)': 'nextTab()',
    '(keydown.arrowDown)': 'nextTab()',
  },
})
export class Tabs implements OnInit {
  /**
   * Reference to the injected CDK Listbox instance.
   */
  cdkListbox = inject(CdkListbox);

  /**
   * The size of the tabs.
   *
   * @defaultValue 'md'
   */
  readonly size = input<TabsSize>('md');

  /**
   * Collection of child options within the listbox.
   */
  readonly tabs = contentChildren(Tab);

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
