import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { ColorPicker, Alert } from '@basis-ng/primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { StepsButtons } from '../../shared/components/steps-buttons';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'article[app-color-picker-documentation]',
  imports: [
    CodeBlock,
    ColorPicker,
    StepsButtons,
    FormsModule,
    ReactiveFormsModule,
    Alert,
  ],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Checkbox', path: '/docs/components/checkbox' }"
      [next]="{ label: 'Combobox', path: '/docs/components/combobox' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Color Picker</h1>
    <div class="flex flex-col gap-4">
      <span>
        Color Picker is a custom input component that allows users to select a
        color.
      </span>
      <code-block [code]="angularImport" />
      <span>
        Include this to apply predefined styles. The component is headless
        without it.
      </span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-700 dark:bg-neutral-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
                Prop
              </th>
              <th
                class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono">
                size
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono">
                'sm' | 'md' | 'lg'
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono">
                value
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono">
                string
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono">
                showColor
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono">
                boolean
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Events</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-700 dark:bg-neutral-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
                Event
              </th>
              <th
                class="border-b border-gray-200 dark:border-neutral-700 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono">
                colorChange
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono">
                string
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <input
          b-color-picker
          [class]="'max-w-[240px]'"
          type="color"
          [showColor]="true"
          [value]="selectedColor"
          (input)="onColorChange($event)" />
      </div>
      <h2 class="font-semibold text-xl">Angular Binding with ngModel</h2>
      <code-block [code]="ngModelUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <input
          b-color-picker
          [class]="'max-w-[240px]'"
          type="color"
          [showColor]="true"
          [(ngModel)]="ngModelColor" />
      </div>
      <h2 class="font-semibold text-xl">Angular Forms with formControlName</h2>
      <code-block [code]="formControlUsage" />
      <form [formGroup]="form">
        <div
          class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
          <input
            b-color-picker
            [class]="'max-w-[240px]'"
            type="color"
            [showColor]="true"
            formControlName="colorControl" />
        </div>
      </form>
      <h2 class="font-semibold text-xl">Without Show Color</h2>
      <code-block [code]="withoutShowColorUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <input
          b-color-picker
          [class]="'max-w-[240px]'"
          type="color"
          [showColor]="false"
          [value]="selectedColor"
          (input)="onColorChange($event)" />
      </div>
      <h2 class="font-semibold text-xl">Input Sizes</h2>
      <code-block [code]="sizeUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <input
          b-color-picker
          [class]="'max-w-[240px]'"
          type="color"
          size="sm" />
        <input
          b-color-picker
          [class]="'max-w-[240px]'"
          type="color"
          size="md" />
        <input
          b-color-picker
          [class]="'max-w-[240px]'"
          type="color"
          size="lg" />
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Checkbox', path: '/docs/components/checkbox' }"
      [next]="{ label: 'Combobox', path: '/docs/components/combobox' }" />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class ColorPickerDocumentation {
  angularImport = `import { ColorPicker } from '@basis-ng/primitives';`;
  stylesImport = `@import '@basis-ng/styles/color-picker';`;
  basicUsage = `<input b-color-picker type="color" [showColor]="true" [value]="selectedColor" (input)="onColorChange($event)" />`;
  withoutShowColorUsage = `<input b-color-picker type="color" [showColor]="false" [value]="selectedColor" (input)="onColorChange($event)" />`;
  ngModelUsage = `<input b-color-picker type="color" [showColor]="true" [(ngModel)]="ngModelColor" />`;
  formControlUsage = `<form [formGroup]="form">\n  <input b-color-picker type="color" [showColor]="true" formControlName="colorControl" />\n</form>`;
  sizeUsage = `<input b-color-picker type="color" size="sm" />\n<input b-color-picker type="color" size="md" />\n<input b-color-picker type="color" size="lg" />`;

  selectedColor = '#ff0000';
  ngModelColor = '#00ff00';
  form = new FormGroup({
    colorControl: new FormControl('#0000ff'),
  });

  onColorChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedColor = inputElement.value;
  }
}
