import { Component, input } from '@angular/core';

@Component({
  selector: 'textarea[b-textarea]',
  template: ``,
  host: {
    '[class.b-size-sm]': 'size() === "sm"',
    '[class.b-size-md]': 'size() === "md"',
    '[class.b-size-lg]': 'size() === "lg"',
  },
})
export class TextareaComponent {
  /**
   * The size of the textarea.
   */
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}
