import { CdkListbox } from '@angular/cdk/listbox';
import {
  Component,
  computed,
  ElementRef,
  inject,
  model,
  output,
} from '@angular/core';
import { OverlayDirective } from '@basis-ng/primitives';

/**
 * Component representing the content of a select dropdown.
 * Manages the list of options and their selection state.
 */
@Component({
  selector: 'ul[b-select-content]',
  imports: [],
  template: `<ng-content />`,
  hostDirectives: [
    {
      directive: CdkListbox,
      inputs: ['cdkListboxMultiple: multiple'],
      outputs: ['cdkListboxValueChange'],
    },
  ],
  host: {
    '(cdkListboxValueChange)': 'changeValueEmitter.emit($event.value)',
    '[animate.enter]': '"b-select-content-entering-" + this.direction()',
    '[animate.leave]': '"b-select-content-leaving-" + this.direction()',
  },
})
export class SelectContent {
  /**
   * Reference to the host element of the component.
   */
  el = inject(ElementRef);

  /**
   * Reference to the CDK Listbox directive.
   */
  listBox = inject(CdkListbox);

  /**
   * Event emitter that emits when the value changes.
   */
  changeValueEmitter = output<string[]>();

  /**
   * Input signal indicating whether multiple selections are allowed.
   */
  readonly multiple = model<boolean>(false);

  /**
   * Reference to the OverlayDirective to determine the direction of the overlay.
   */
  overlay = inject(OverlayDirective);

  /**
   * Computed signal representing the direction of the overlay.
   */
  readonly direction = computed(() => this.overlay.direction());
}
