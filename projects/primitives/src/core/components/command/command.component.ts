import {
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { Input } from '../input/input.component';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { CommandOptionsComponent } from './command-options.component';

/**
 * Component representing a command input with associated options.
 * It provides keyboard navigation and focus trapping for accessibility.
 */
@Component({
  selector: 'b-command',
  imports: [Input, CdkTrapFocus],
  template: `<input
      type="text"
      b-input
      cdkTrapFocus
      [cdkTrapFocusAutoCapture]="true"
      #trappedInput
      (keydown.arrowDown)="commandOptions()?.nextOption()"
      (keydown.arrowUp)="commandOptions()?.previousOption()"
      (keydown.enter)="commandOptions()?.selectOption()"
      (blur)="trappedInput.el.nativeElement.focus()" />
    <ng-content />`,
  host: {
    '[style.maxWidth]': 'maxWidth()',
    '[style.maxHeight]': 'maxHeight()',
  },
})
export class CommandComponent {
  /**
   * Reference to the child `CommandOptionsComponent` if present.
   * Used to interact with the options for navigation and selection.
   */
  readonly commandOptions = contentChild(CommandOptionsComponent);

  /**
   * Input representing the maximum width of the component.
   * This can be used to control the visual appearance of the command component.
   */
  readonly maxWidth = input('100%');

  /**
   * Input representing the maximum height of the component.
   * This can be used to control the visual appearance of the command component.
   */
  readonly maxHeight = input('300px');

  /**
   * Computed signal representing the selected value from the command options.
   * This is linked to the value of the `CommandOptionsComponent`.
   */
  readonly value = computed(() => this.commandOptions()?.value());

  /**
   * Computed signal representing the options available in the command options.
   * This is linked to the options of the `CommandOptionsComponent`.
   */
  readonly options = computed(() => this.commandOptions()?.options());

  /**
   * Reference to the host element of the component.
   * This provides access to the DOM element of the command component.
   */
  el = inject(ElementRef);
}
