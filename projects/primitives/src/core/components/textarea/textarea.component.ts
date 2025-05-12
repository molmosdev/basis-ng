import { Component, input } from '@angular/core';

@Component({
  selector: 'textarea[b-textarea]',
  template: ``,
  host: {
    '[class]': ' "size-" + size() ',
  },
})
export class TextareaComponent {
  /**
   * The size of the input.
   */
  readonly size = input<'1' | '2' | '3'>('2');
}
