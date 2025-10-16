import { CdkOption } from '@angular/cdk/listbox';
import { Component, ElementRef, inject } from '@angular/core';

/**
 * Component representing an individual option in a select or combobox.
 * This component integrates with Angular CDK Option to manage the option's state and behavior.
 */
@Component({
  selector: 'li[b-option]',
  imports: [],
  template: ` <ng-content /> `,
  hostDirectives: [
    {
      directive: CdkOption,
      inputs: ['cdkOption: value', 'cdkOptionDisabled: disabled'],
    },
  ],
})
export class Option {
  /**
   * The `ElementRef` of the option.
   * This provides direct access to the DOM element of the option.
   */
  el = inject(ElementRef);

  /**
   * The `CdkOption` instance associated with this option.
   * This provides methods and properties for managing the option's state, such as selection and value.
   */
  cdkOption = inject(CdkOption);
}
