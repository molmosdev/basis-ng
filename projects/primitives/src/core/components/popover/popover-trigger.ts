import { Directive, effect, ElementRef, inject, input, model } from '@angular/core';

@Directive({
  selector: '[bPopoverTrigger]',
  host: {
    '(click)': '(mode() === "click" && !disabled()) && active.set(!active())',
    '(mouseenter)': '(mode() === "hover" && !disabled()) && active.set(true)',
  },
})
export class PopoverTrigger {
  el = inject(ElementRef);
  readonly active = model(false);
  readonly mode = input<'click' | 'hover'>('click');
  readonly closeOnOutsideClick = input(true);
  readonly disabled = model(false);

  constructor() {
    effect(() => console.log('PopoverTrigger active:', this.active()));
  }
}
