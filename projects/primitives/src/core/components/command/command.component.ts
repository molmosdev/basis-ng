import {
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  input,
  signal,
  output,
  OnDestroy,
} from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { CommandOptionsComponent } from './command-options.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { InputComponent } from '../input/input.component';
import { UtilsService } from '../../../shared/services/utils.service';

/**
 * Component representing a command input with associated options.
 * It provides keyboard navigation and focus trapping for accessibility.
 */
@Component({
  selector: 'b-command',
  imports: [InputComponent, CdkTrapFocus],
  template: `<input
      type="text"
      b-input
      cdkTrapFocus
      [cdkTrapFocusAutoCapture]="isDesktop()"
      #trappedInput
      (keydown.arrowDown)="commandOptions()?.nextOption()"
      (keydown.arrowUp)="commandOptions()?.previousOption()"
      (keydown.enter)="commandOptions()?.selectOption()"
      (blur)="isDesktop() && trappedInput.el.nativeElement.focus()"
      (input)="onInput($event)" />
    <ng-content />`,
  host: {
    '[style.maxHeight]': 'maxHeight()',
  },
})
export class CommandComponent implements OnDestroy {
  /**
   * Reference to the child `CommandOptionsComponent` if present.
   * Used to interact with the options for navigation and selection.
   */
  readonly commandOptions = contentChild(CommandOptionsComponent);

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
   * Reference to the BreakpointObserver service for responsive design.
   */
  breakpointObserver = inject(BreakpointObserver);

  /**
   * Signal representing whether the current viewport is desktop or not.
   * This is determined by checking if the Handset breakpoint is matched.
   */
  readonly isDesktop = signal(
    !this.breakpointObserver.isMatched(Breakpoints.Handset)
  );

  /**
   * Reference to the host element of the component.
   * This provides access to the DOM element of the command component.
   */
  el = inject(ElementRef);

  /**
   * Output that emits the current input value.
   */
  readonly inputValueChange = output<string>();

  /**
   * Input to control debounce time (ms) for valueChange emission.
   */
  readonly debounce = input(0);

  /**
   * Reference to the UtilsService for debounce logic.
   */
  private utils = inject(UtilsService);

  /**
   * Unique key for debounce timer.
   */
  private readonly debounceKey = 'command-input';

  /**
   * Handler for input event, emits value with debounce if set.
   */
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const debounceMs = this.debounce();
    if (debounceMs && debounceMs > 0) {
      this.utils.debounce(
        this.debounceKey,
        () => this.inputValueChange.emit(value),
        debounceMs
      );
    } else {
      this.inputValueChange.emit(value);
    }
  }

  ngOnDestroy() {
    this.utils.stopDebounce(this.debounceKey);
  }
}
