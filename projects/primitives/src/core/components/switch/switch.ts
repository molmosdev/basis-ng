import { AfterViewInit, Component, ElementRef, inject, output, signal } from '@angular/core';

@Component({
  selector: 'input[b-switch]',
  template: ``,
  host: {
    '[attr.role]': 'switch',
    '[attr.checked]': 'value()',
    '[attr.aria-checked]': 'value()',
    '(click)': 'toggleValue()',
    '(keydown.enter)': 'toggleValue()',
    '(keydown.arrowleft)': 'setValue(false)',
    '(keydown.arrowright)': 'setValue(true)',
  },
})
export class SwitchComponent implements AfterViewInit {
  readonly value = signal<boolean>(false);
  el = inject(ElementRef);
  valueChange = output<boolean>();

  ngAfterViewInit() {
    this.value.set(this.el.nativeElement.checked);
  }

  toggleValue() {
    const newValue = !this.value();
    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }

  setValue(newValue: boolean) {
    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }
}
