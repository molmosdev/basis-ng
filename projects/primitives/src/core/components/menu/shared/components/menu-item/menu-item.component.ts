import { CdkMenuItem } from '@angular/cdk/menu';
import { Component } from '@angular/core';

/**
 * Represents a menu item with support for typeahead and disabled states.
 */
@Component({
  selector: 'b-menu-item',
  imports: [],
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
})
export class MenuItemComponent {}
