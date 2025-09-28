import { Component, input } from '@angular/core';

@Component({
  selector: 'textarea[b-textarea]',
  template: ``,
  host: {
    '[class.b-textarea-size-sm]': 'size() === "sm"',
    '[class.b-textarea-size-md]': 'size() === "md"',
    '[class.b-textarea-size-lg]': 'size() === "lg"',
  },
})
export class TextareaComponent {
  /**
   * The size of the textarea.
   */
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}
