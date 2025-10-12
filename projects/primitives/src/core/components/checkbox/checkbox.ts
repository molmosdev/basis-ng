import {
  Component,
  ElementRef,
  inject,
  model,
  output,
  AfterViewInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'input[b-checkbox]',
  template: ``,
  host: {
    '[attr.role]': 'checkbox',
    '[attr.checked]': 'value()',
    '[attr.aria-checked]': 'value()',
    '(click)': 'toggleValue()',
    '(keydown.enter)': 'toggleValue()',
    '(keydown.space)': 'toggleValue()',
  },
})
export class Checkbox implements AfterViewInit {
  readonly value = signal<boolean>(false);
  el = inject(ElementRef);
  valueChange = output<boolean>();
  readonly size = model<'sm' | 'md' | 'lg'>('md');

  ngAfterViewInit() {
    this.value.set(this.el.nativeElement.checked);
  }

  toggleValue() {
    const newValue = !this.value();
    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }
}
