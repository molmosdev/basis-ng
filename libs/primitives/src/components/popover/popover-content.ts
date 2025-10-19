import { Component } from '@angular/core';

/**
 * Popover content that is displayed within a connected overlay.
 * Unlike tooltip content, popover content uses padding and flexible height
 * so it can contain multiple lines of text and larger blocks.
 */
@Component({
  selector: 'b-popover-content',
  template: ` <ng-content /> `,
})
export class PopoverContent {}
