import {
  Component,
  computed,
  contentChild,
  input,
  signal,
  AfterViewInit,
  inject,
  ElementRef,
} from '@angular/core';
import { ControlContainer, NgModel } from '@angular/forms';

@Component({
  selector: 'input[b-color-picker]',
  imports: [],
  template: ``,
  host: {
    '[class.focused]': 'focused()',
    '[style.max-width]': 'maxWidth()',
    '[style.--value]': 'valueWithSingleQuotes()',
    '[style.--text-color]': 'textColor()',
    '[class.show-color]': 'showColor()',
    '(focus)': 'focused.set(true)',
    '(blur)': 'focused.set(false)',
    '(input)': 'value.set($event.target.value)',
  },
})
export class ColorPicker implements AfterViewInit {
  /**
   * Specifies the maximum width of the input.
   */
  readonly maxWidth = input('');

  /**
   * Represents the value of the input.
   */
  readonly value = signal<string>('#ffffff');

  /**
   * Computed signal for the text color with single quotes.
   */
  readonly valueWithSingleQuotes = computed(() => {
    return `'${this.value()}'`;
  });

  /**
   * A computed signal that dynamically calculates the text color based on the resolved value.
   */
  readonly textColor = computed(() => {
    const backgroundColor = this.resolveColor(this.value());
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 128 ? '#000000' : '#FFFFFF';
  });

  /**
   * Indicates whether the input is focused.
   */
  readonly focused = signal<boolean>(false);

  /**
   * A reference to the `NgModel` directive.
   */
  private readonly ngModel = contentChild<NgModel>(NgModel);

  /**
   * Indicates whether to show the color value.
   */
  readonly showColor = input<boolean>(true);

  /**
   * A reference to the native element.
   */
  el = inject(ElementRef);

  /**
   * A reference to the control container.
   */
  private controlContainer = inject(ControlContainer, { optional: true });

  /**
   * Lifecycle hook that is called after the view has been initialized.
   * Sets the initial value of the picker and attaches event listeners.
   */
  ngAfterViewInit(): void {
    const formControl = this.controlContainer?.control?.get(
      this.el.nativeElement.getAttribute('formControlName')
    );

    // Inicializa el valor del signal
    this.value.set(
      this.el?.nativeElement.value || this.ngModel()?.value || '#000000'
    );

    // Suscríbete a los cambios del FormControl
    formControl?.valueChanges.subscribe((newValue: string) => {
      this.value.set(newValue || '#000000');
    });
  }

  /**
   * Resolves a color value, handling cases like `transparent` or `color-mix`.
   * @param value The input color value.
   * @returns A valid hexadecimal color.
   */
  resolveColor(value: string): string {
    // Handle `color-mix` values
    const colorMixMatch = value.match(
      /color-mix\(in srgb, (#[0-9a-fA-F]{6}), (#[0-9a-fA-F]{6}) (\d+)%\)/
    );
    if (colorMixMatch) {
      const [, color1, color2, percentage] = colorMixMatch;
      return this.calculateColorMix(
        color1,
        color2,
        parseInt(percentage, 10) / 100
      );
    }

    // Handle `transparent` values
    if (value === 'transparent') {
      return '#ffffff'; // Default to white for transparency
    }

    return value; // Return the original value if no special cases
  }

  /**
   * Calculates the result of a `color-mix` operation.
   * @param color1 The first color in hexadecimal format.
   * @param color2 The second color in hexadecimal format.
   * @param percentage The mix percentage for the second color.
   * @returns The resulting mixed color in hexadecimal format.
   */
  calculateColorMix(
    color1: string,
    color2: string,
    percentage: number
  ): string {
    const hexToRgb = (hex: string) => {
      const bigint = parseInt(hex.replace('#', ''), 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    };

    const rgbToHex = (r: number, g: number, b: number) =>
      `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const r = Math.round(rgb1.r * (1 - percentage) + rgb2.r * percentage);
    const g = Math.round(rgb1.g * (1 - percentage) + rgb2.g * percentage);
    const b = Math.round(rgb1.b * (1 - percentage) + rgb2.b * percentage);

    return rgbToHex(r, g, b);
  }
}
