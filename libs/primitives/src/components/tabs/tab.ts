import { CdkOption } from '@angular/cdk/listbox';
import { Component, inject } from '@angular/core';

/**
 * A single tab within a tabs list.
 */
@Component({
  selector: 'b-tab',
  imports: [],
  template: ` <ng-content /> `,
  hostDirectives: [
    {
      directive: CdkOption,
      inputs: ['cdkOption: value'],
    },
  ],
})
export class Tab {
  /**
   * Underlying CDK option instance used by the tabs list.
   */
  cdkOption = inject(CdkOption);
}
