import { CdkMenuItem } from '@angular/cdk/menu';
import { Component } from '@angular/core';

/**
 * Menu item wrapper that forwards behavior to the CDK menu item.
 */
@Component({
  selector: 'button[b-menu-item]',
  template: ` <ng-content /> `,
  hostDirectives: [
    {
      directive: CdkMenuItem,
      inputs: ['cdkMenuItemDisabled: disabled', 'cdkMenuitemTypeaheadLabel: typeaheadLabel'],
      outputs: ['cdkMenuItemTriggered: triggered'],
    },
  ],
})
export class MenuItem {}
