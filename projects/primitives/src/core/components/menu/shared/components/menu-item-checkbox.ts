import { CdkMenuItemCheckbox } from '@angular/cdk/menu';
import { Component, input } from '@angular/core';

/**
 * Represents a checkbox menu item.
 */
@Component({
  selector: 'button[b-menu-item-checkbox]',
  template: `<ng-content />`,
  hostDirectives: [
    {
      directive: CdkMenuItemCheckbox,
      inputs: [
        'cdkMenuItemDisabled: disabled',
        'cdkMenuitemTypeaheadLabel: typeaheadLabel',
        'cdkMenuItemChecked: active',
      ],
      outputs: ['cdkMenuItemTriggered: triggered'],
    },
  ],
  host: {
    '[class.squared]': 'squared()',
  },
})
export class MenuItemCheckbox {
  /**
   * Input to set the squared state of the menu item.
   */
  readonly squared = input(false);
}
