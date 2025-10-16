import { CdkMenuItemCheckbox } from '@angular/cdk/menu';
import { Component } from '@angular/core';

/**
 * Menu item checkbox that connects to the CDK menu checkbox behavior.
 */
@Component({
  selector: 'button[b-menu-item-checkbox]',
  template: ` <ng-content /> `,
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
export class MenuItemCheckbox {}
