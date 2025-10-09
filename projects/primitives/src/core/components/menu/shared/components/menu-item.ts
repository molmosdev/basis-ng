import { CdkMenuItem } from '@angular/cdk/menu';
import { Component, input } from '@angular/core';

/**
 * Represents a menu item with support for typeahead and disabled states.
 */
@Component({
  selector: 'button[b-menu-item]',
  template: `<ng-content />`,
  hostDirectives: [
    {
      directive: CdkMenuItem,
      inputs: [
        'cdkMenuItemDisabled: disabled',
        'cdkMenuitemTypeaheadLabel: typeaheadLabel',
      ],
      outputs: ['cdkMenuItemTriggered: triggered'],
    },
  ],
  host: {
    '[class.squared]': 'squared()',
    '[class.destructive]': 'destructive()',
  },
})
export class MenuItem {
  /**
   * Input to set the squared state of the menu item.
   */
  readonly squared = input(false);

  /**
   * Input to set the destructive state of the menu item.
   */
  readonly destructive = input(false);
}
