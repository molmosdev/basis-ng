import { CdkMenuItemRadio } from '@angular/cdk/menu';
import { Component } from '@angular/core';

/**
 * Menu radio item that integrates CDK menu radio behavior.
 */
@Component({
  selector: 'button[b-menu-item-radio]',
  template: ` <ng-content /> `,
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
export class MenuItemRadio {}
