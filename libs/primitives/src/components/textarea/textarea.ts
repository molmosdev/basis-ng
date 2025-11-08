import { Component, input } from '@angular/core';

/**
 * A styled textarea component.
 */
@Component({
  selector: 'textarea[b-textarea]',
  template: ``,
  host: {
    '[attr.data-invalid]': 'invalid() ? "" : null',
  },
})
export class Textarea {
  /**
   * Whether the textarea is in an invalid state.
   */
  readonly invalid = input<boolean>(false);
}
