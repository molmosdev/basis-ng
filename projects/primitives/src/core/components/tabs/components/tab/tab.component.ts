import { NgClass } from '@angular/common';
import { Component, ElementRef, input, output, signal } from '@angular/core';

@Component({
  selector: 'b-tab',
  imports: [NgClass],
  templateUrl: './tab.component.html',
})
export class Tab {
  readonly value = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly selected = signal<boolean>(false);
  readonly highlighted = signal<boolean>(false);
  selectEmitter = output<Tab>();

  constructor(public el: ElementRef) {}

  /**
   * Emit the select event when the tab is selected.
   */
  onSelect(): void {
    this.selectEmitter.emit(this);
  }

  /**
   * Highlight the tab on mouse enter if it is not disabled and not in keyboard-active mode.
   */
  onMouseEnter() {
    if (
      !this.disabled() &&
      !this.el.nativeElement.parentElement.parentElement.classList.contains(
        'keyboard-active'
      )
    ) {
      this.highlighted.set(true);
    }
  }

  /**
   * Remove the highlight from the tab on mouse leave if it is not disabled and not in keyboard-active mode.
   */
  onMouseLeave() {
    if (
      !this.disabled() &&
      !this.el.nativeElement.parentElement.parentElement.classList.contains(
        'keyboard-active'
      )
    ) {
      this.highlighted.set(false);
    }
  }
}
