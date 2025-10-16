import { Component, ElementRef, inject } from '@angular/core';

/**
 * A lightweight attribute button component that projects content into a native button.
 */
@Component({
  selector: 'button[b-button]',
  imports: [],
  template: ` <ng-content /> `,
})
export class Button {
  /**
   * Reference to the host button element.
   */
  el = inject(ElementRef);
}
