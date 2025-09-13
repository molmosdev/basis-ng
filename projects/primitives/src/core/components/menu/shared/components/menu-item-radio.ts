import { CdkMenuItemRadio } from '@angular/cdk/menu';
import { Component, input } from '@angular/core';

/**
 * Represents a radio menu item.
 */
@Component({
  selector: 'button[b-menu-item-radio]',
  template: `<ng-content />`,
  hostDirectives: [
    {
      directive: CdkMenuItemRadio,
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
export class MenuItemRadio {
  /**
   * Input to set the squared state of the menu item.
   */
  readonly squared = input(false);
}
