import {
  Component,
  contentChild,
  forwardRef,
  effect,
  signal,
  computed,
  viewChild,
  input,
} from '@angular/core';
import { SelectContent } from './components/select-content';
import { OverlayDirective } from '../../../directives/overlay.directive';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectTrigger } from './components/select-trigger';
import { SelectValue } from './components/select-value';

@Component({
  selector: 'b-select',
  imports: [OverlayDirective],
  template: ` <ng-content />
    <ng-template
      bOverlay
      [trigger]="selectTrigger()!.trigger"
      [open]="open()"
      (attach)="handleAttatch()"
      (detach)="handleDetatch()"
      (outsideClick)="open.set(false)"
      (backdropClick)="open.set(false)"
      [positions]="['bottom-left', 'bottom-right', 'top-left', 'top-right']">
      <ng-content select="[b-select-content]" />
    </ng-template>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
  host: {
    '[class.b-size-1]': 'size() === "1"',
    '[class.b-size-2]': 'size() === "2"',
    '[class.b-size-3]': 'size() === "3"',
  },
})
export class Select implements ControlValueAccessor {
  readonly overlay = viewChild(OverlayDirective);
  readonly selectTrigger = contentChild(SelectTrigger);
  readonly selectValue = contentChild(SelectValue);
  readonly selectContent = contentChild(SelectContent);
  readonly options = computed(() => this.selectContent()?.options());
  readonly open = signal(false);
  readonly value = signal<string[]>([]);
  readonly size = input<'1' | '2' | '3'>('2');

  constructor() {
    effect(() => {
      this.handleValueChanges();
      this.handleTriggerClicks();
      this.handleCloseEmitter();
    });
  }

  handleAttatch() {
    this.open.set(true);
    setTimeout(() => this.selectContent()?.el.nativeElement.focus(), 0);
  }

  handleDetatch() {
    this.open.set(false);
  }

  handleTriggerClicks() {
    this.selectTrigger()!.buttonClicked.subscribe(() => {
      this.open.set(true);
    });
  }

  handleValueChanges() {
    this.selectContent()?.changeValueEmitter.subscribe((value: string[]) => {
      this.onChange(value);
      this.onTouched();
      this.value.set(value);
      this.setContent(value);
    });
  }

  handleCloseEmitter() {
    this.selectContent()?.closeEmitter.subscribe(() => {
      this.open.set(!this.open());
    });
  }

  setContent(value: string | string[]): void {
    let content: string | undefined = '';
    if (value && value.length > 0 && !(value.length === 1 && value[0] === '')) {
      content = this.options()?.reduce((acc, option) => {
        if (value.includes(option.cdkOption.value)) {
          return acc
            ? acc + ', ' + option.el.nativeElement.innerText
            : option.el.nativeElement.innerText;
        }
        return acc;
      }, '');
    }
    this.selectValue()?.content.set(content || '');
  }

  // Control value accessor methods
  writeValue(value: string | string[]): void {
    if (!value) {
      return;
    }
    const values = this.selectContent()?.multiple()
      ? Array.isArray(value)
        ? value
        : [value]
      : [typeof value === 'string' ? value : value?.[0]];
    if (values) {
      values.forEach(val => {
        this.selectContent()?.listBox?.selectValue(val);
      });
      this.value.set(values);
      this.setContent(values);
    }
  }

  private onChange: (value: string[]) => void = () => undefined;

  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = (val: string[]) => {
      if (this.selectContent()?.multiple()) {
        fn(val);
      } else {
        fn(val?.[0] ?? '');
      }
    };
  }

  private onTouched: () => void = () => undefined;

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.selectTrigger()?.disabled.set(isDisabled);
  }
}
