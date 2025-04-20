import { Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'option[b-option]',
  template: `<ng-content />`,
})
export class Option {
  /**
   * Reference to the host element.
   */
  el = inject(ElementRef);
}
