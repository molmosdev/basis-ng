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
import { Input } from '../input/input';
import { Utils } from '../../../shared/services/utils';

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
  readonly commandOptions = contentChild(CommandOptionsComponent);
  readonly maxHeight = input('300px');
  readonly value = computed(() => this.commandOptions()?.value());
  readonly options = computed(() => this.commandOptions()?.options());
  breakpointObserver = inject(BreakpointObserver);
  readonly isDesktop = signal(!this.breakpointObserver.isMatched(Breakpoints.Handset));
  el = inject(ElementRef);
  readonly inputValueChange = output<string>();
  readonly debounce = input(0);
  private utils = inject(Utils);
  private readonly debounceKey = 'command-input';

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
