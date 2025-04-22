import { CdkOption } from '@angular/cdk/listbox';
import { Component, ElementRef, inject } from '@angular/core';

/**
 * Component representing an individual option in a select dropdown.
 * This component integrates with Angular CDK Option to manage the option's state and behavior.
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
   * The `ElementRef` of the select option.
   * This provides direct access to the DOM element of the option.
   */
  el = inject(ElementRef);

  /**
   * The `CdkOption` instance associated with this select option.
   * This provides methods and properties for managing the option's state, such as selection and value.
   */
  option = inject(CdkOption);
}
