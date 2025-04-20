import { CdkMenuItemCheckbox } from '@angular/cdk/menu';
import { Component } from '@angular/core';

/**
 * Represents a checkbox menu item.
 */
@Component({
  selector: 'b-menu-item-checkbox',
  imports: [],
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
})
export class MenuItemCheckboxComponent {}
