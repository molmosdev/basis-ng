import { Component, contentChild, input } from '@angular/core';
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
}
