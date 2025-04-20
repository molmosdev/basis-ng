import { CdkMenuItemRadio } from '@angular/cdk/menu';
import { Component } from '@angular/core';

/**
 * Represents a radio menu item.
 */
@Component({
  selector: 'b-menu-item-radio',
  imports: [],
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
})
export class MenuItemRadioComponent {}
