import { CdkTrapFocus } from '@angular/cdk/a11y';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import { Utils } from '../../services/utils';
import { Input } from '../input/input';
import { CommandOptionsComponent } from './command-options.component';

/**
 * Input with integrated command options and keyboard handling.
 */
@Component({
  selector: 'b-command',
  imports: [Input, CdkTrapFocus],
  template: `
    <input
      type="text"
      b-input
      cdkTrapFocus
      [cdkTrapFocusAutoCapture]="isDesktop()"
      #trappedInput
      (keydown.arrowDown)="commandOptions()?.nextOption()"
      (keydown.arrowUp)="commandOptions()?.previousOption()"
      (keydown.enter)="commandOptions()?.selectOption()"
      (blur)="isDesktop() && trappedInput.el.nativeElement.focus()"
      (input)="onInput($event)"
    />
    <ng-content />
  `,
  host: {
    '[style.maxHeight]': 'maxHeight()',
  },
})
export class CommandComponent implements OnDestroy {
  /**
   * Child CommandOptionsComponent instance.
   */
  readonly commandOptions = contentChild(CommandOptionsComponent);

  /**
   * Maximum height for the command list.
   */
  readonly maxHeight = input('300px');

  /**
   * Computed selected value from the command options.
   */
  readonly value = computed(() => this.commandOptions()?.value());

  /**
   * Computed available options from the child component.
   */
  readonly options = computed(() => this.commandOptions()?.options());

  /**
   * Breakpoint observer for responsive behavior.
   */
  breakpointObserver = inject(BreakpointObserver);

  /**
   * Signal that indicates whether the viewport is desktop-sized.
   */
  readonly isDesktop = signal(!this.breakpointObserver.isMatched(Breakpoints.Handset));

  /**
   * Element reference to the host component.
   */
  el = inject(ElementRef);

  /**
   * Emitted when the input value changes.
   */
  readonly inputValueChange = output<string>();

  /**
   * Debounce delay in milliseconds for input events.
   */
  readonly debounce = input(0);

  /**
   * Utility functions for common tasks.
   */
  private utils = inject(Utils);

  /**
   * Key for debouncing input events.
   */
  private readonly debounceKey = 'command-input';

  /**
   * Handle native input events and emit debounced value.
   * @param event - Native input event.
   */
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const debounceMs = this.debounce();
    if (debounceMs && debounceMs > 0) {
      this.utils.debounce(this.debounceKey, () => this.inputValueChange.emit(value), debounceMs);
    } else {
      this.inputValueChange.emit(value);
    }
  }

  ngOnDestroy() {
    this.utils.stopDebounce(this.debounceKey);
  }
}
