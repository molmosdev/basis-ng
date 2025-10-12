import {
  Component,
  contentChild,
  forwardRef,
  signal,
  input,
  OnInit,
  effect,
} from '@angular/core';
import { ConnectedOverlay } from '../../directives/connected-overlay';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectTrigger } from './select-trigger';
import { SelectValue } from './select-value';
import { SelectContent } from './select-content';

@Component({
  selector: 'b-select',
  template: `<ng-content />`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
})
export class Select implements ControlValueAccessor, OnInit {
  readonly overlay = contentChild(ConnectedOverlay);
  readonly selectTrigger = contentChild(SelectTrigger);
  readonly selectValue = contentChild(SelectValue);
  readonly selectContent = contentChild(SelectContent);
  readonly displayWith = input.required<(value: string[]) => string>();
  readonly value = signal<string[]>([]);

  constructor() {
    effect(() => {
      this.handleValueChanges();
      this.handleSelectContentWidth();
    });
  }

  handleValueChanges(): void {
    this.selectContent()?.changeValueEmitter.subscribe((value: string[]) => {
      this.onChange(value);
      if (!this.selectContent()?.listBox.multiple) {
        this.overlay()?.closeOverlay();
      }
      this.onTouched();
    });
  }

  handleSelectContentWidth(): void {
    const selectContentEl = this.selectContent()?.el.nativeElement;
    if (selectContentEl) {
      selectContentEl.style.minWidth = `${
        this.selectTrigger()?.el.nativeElement.offsetWidth
      }px`;
    }
  }

  ngOnInit(): void {
    this.handleTriggerClicks();
    this.handleOverlayAttached();
    this.handleOverlayDetached();
    this.handleOverlayOutsideClick();
    this.handleOverlayBackdropClick();
  }

  handleTriggerClicks(): void {
    this.selectTrigger()!.buttonClicked.subscribe(() => {
      this.overlay()?.toggleOverlay();
    });
  }

  handleOverlayAttached(): void {
    this.overlay()?.attachEmitter.subscribe(() => {
      if (this.value().length === 0) {
        this.selectContent()?.el.nativeElement.focus();
        return;
      }

      this.value().forEach(val => {
        this.selectContent()?.listBox?.selectValue(val);

        // Focus the selected option
        this.selectContent()
          ?.options()
          .find(opt => opt.value === val)
          ?.focus();
      });
    });
  }

  handleOverlayDetached(): void {
    this.overlay()?.detachEmitter.subscribe(() => {
      this.overlay()?.closeOverlay();
    });
  }

  handleOverlayOutsideClick(): void {
    this.overlay()?.outsideClickEmitter.subscribe(() => {
      this.overlay()?.closeOverlay();
    });
  }

  handleOverlayBackdropClick(): void {
    this.overlay()?.backdropClickEmitter.subscribe(() => {
      this.overlay()?.closeOverlay();
    });
  }

  // Control value accessor methods

  writeValue(value: string[]): void {
    this.setValue(value);
  }

  private onChange: (value: string[]) => void = () => undefined;

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = (val: string[]) => {
      fn(val);
      this.setValue(val);
    };
  }

  private onTouched: () => void = () => undefined;

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.selectTrigger()?.disabled.set(isDisabled);
  }

  setValue(value: string[]): void {
    this.value.set(value);
    this.selectValue()?.content.set(this.displayWith()(value));
  }
}
