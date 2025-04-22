import { CdkOption } from '@angular/cdk/listbox';
import { Component, ElementRef, inject } from '@angular/core';

/**
 * Component representing an individual option in a select dropdown.
 * It integrates with Angular CDK Option for option management.
 */
@Component({
  selector: 'li[b-select-option]',
  imports: [],
  template: `<ng-content />`,
  hostDirectives: [
    {
      directive: CdkOption,
      inputs: ['cdkOption: value'],
    },
  ],
})
export class SelectOptionComponent {
  /**
   * The ElementRef of the select option.
   * Provides access to the DOM element of the option.
   */
  el = inject(ElementRef);
}
