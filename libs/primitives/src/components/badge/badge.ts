import { Component } from '@angular/core';

/**
 * A minimal badge component that projects inline content inside a span.
 */
@Component({
  selector: 'span[b-badge]',
  template: ` <ng-content /> `,
})
export class Badge {}
