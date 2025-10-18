import { Component } from '@angular/core';

/**
 * Wrapper for grouping textarea-related elements vertically.
 */
@Component({
  selector: 'b-textarea-group',
  template: ` <ng-content /> `,
})
export class TextareaGroup {}
