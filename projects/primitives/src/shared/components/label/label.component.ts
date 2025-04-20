import { Component, computed, contentChild } from '@angular/core';
import { Select, Input, Switch, Checkbox, Textarea } from '../../../public-api';

@Component({
  selector: 'b-label',
  imports: [],
  template: `<ng-content />`,
  host: {
    '[class.up]': 'labelUp()',
    '[style.max-width]': 'maxWidth()',
    '[class.is-switch]': 'switch()',
    '[class.is-checkbox]': 'checkbox()',
    '[class.is-textarea]': 'textarea()',
  },
})
export class Label {
  /**
   * The input element.
   */
  readonly input = contentChild(Input);

  /**
   * The select element.
   */
  readonly select = contentChild(Select);

  /**
   * The switch element.
   */
  readonly switch = contentChild(Switch);

  /**
   * The checkbox element.
   */
  readonly checkbox = contentChild(Checkbox);

  /**
   * The textarea element.
   */
  readonly textarea = contentChild(Textarea);

  /**
   * Whether the label should be up.
   */
  readonly labelUp = computed(() => {
    const input = this.input();
    const select = this.select();
    const textarea = this.textarea();

    return (
      input?.focused() ||
      input?.value() ||
      input?.placeholder() ||
      select?.value() ||
      textarea?.focused() ||
      textarea?.value() ||
      textarea?.placeholder()
    );
  });

  /**
   * The label width.
   */
  readonly maxWidth = computed(() => {
    const input = this.input();
    const textarea = this.textarea();
    return input?.maxWidth() || this.select()?.maxWidth() || textarea?.cols();
  });
}
