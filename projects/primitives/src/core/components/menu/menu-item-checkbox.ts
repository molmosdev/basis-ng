import { CdkMenuItemCheckbox } from '@angular/cdk/menu';
import { Component } from '@angular/core';

@Component({
  selector: 'button[b-menu-item-checkbox]',
  template: `
    <ng-content />
  `,
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
