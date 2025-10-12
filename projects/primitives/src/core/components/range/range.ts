import {
  Component,
  ElementRef,
  inject,
  model,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'input[b-range]',
  template: ``,
  host: {
    '[attr.value]': 'value()',
    '(input)': 'onInput($event)',
  },
})
export class Range implements AfterViewInit {
  readonly value = model<string>('0');
  el = inject(ElementRef);

  ngAfterViewInit() {
    this.value.set(this.el.nativeElement.value);
  }

  onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
