import { CdkOption } from '@angular/cdk/listbox';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'b-tab',
  imports: [],
  template: `<ng-content />`,
  hostDirectives: [
    {
      directive: CdkOption,
      inputs: ['cdkOption: value'],
    },
  ],
})
export class Tab {
  /**
   * Reference to the injected CDK Option instance.
   */
  cdkOption = inject(CdkOption);
}
