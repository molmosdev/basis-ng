import { Component } from '@angular/core';
import { Checkbox, Alert } from '@basis-ng/primitives';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import { CodeBlock } from '../shared/components/code-block';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { StepsButtons } from '../../shared/components/steps-buttons';

@Component({
  selector: 'article[app-checkbox-documentation]',
  imports: [
    CodeBlock,
    Checkbox,
    FormsModule,
    ReactiveFormsModule,
    StepsButtons,
    Alert,
  ],
  providers: [provideIcons({ lucideRocket })],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Card', path: '/docs/components/card' }"
      [next]="{
        label: 'Color Picker',
        path: '/docs/components/color-picker',
      }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Checkbox</h1>
    <div class="flex flex-col gap-4">
      <span> Checkbox is a custom toggle component. </span>
      <code-block [code]="angularImport" />
      <span>
        Include this to apply predefined styles. The component is headless
        without it.
      </span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">
                Prop
              </th>
              <th
                class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                value
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                boolean
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                size
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                <strong>'md'</strong> | 'sm' | 'lg'
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic</h2>
      <code-block [code]="basicUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <input
          type="checkbox"
          b-checkbox
          [value]="basicValue"
          (valueChange)="onValueChange($event)" />
      </div>
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizesUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <input type="checkbox" b-checkbox size="sm" />
        <input type="checkbox" b-checkbox size="md" />
        <input type="checkbox" b-checkbox size="lg" />
      </div>
      <h2 class="font-semibold text-xl">Angular Binding with ngModel</h2>
      <code-block [code]="ngModelUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <input type="checkbox" b-checkbox [(ngModel)]="ngModelValue" />
      </div>
      <h2 class="font-semibold text-xl">Angular Forms with formControlName</h2>
      <code-block [code]="formControlUsage" />
      <form [formGroup]="form">
        <div
          class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col items-center justify-center gap-4">
          <input type="checkbox" b-checkbox formControlName="checkboxControl" />
        </div>
      </form>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Card', path: '/docs/components/card' }"
      [next]="{
        label: 'Color Picker',
        path: '/docs/components/color-picker',
      }" />
  `,
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class CheckboxDocumentation {
  angularImport = `import { CheckboxComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/checkbox';`;
  basicUsage = `<input type="checkbox" b-checkbox [value]="basicValue" (valueChange)="onValueChange($event)" />`;
  sizesUsage = `<input type="checkbox" b-checkbox size="sm" />\n<input type="checkbox" b-checkbox size="md" />\n<input type="checkbox" b-checkbox size="lg" />`;
  ngModelUsage = `<input type="checkbox" b-checkbox [(ngModel)]="ngModelValue" />`;
  formControlUsage = `<input type="checkbox" b-checkbox formControlName="checkboxControl" />`;

  basicValue = false;
  ngModelValue = false;
  form = new FormGroup({
    checkboxControl: new FormControl(false),
  });

  onValueChange(value: boolean) {
    console.log('Checkbox value changed:', value);
  }
}
