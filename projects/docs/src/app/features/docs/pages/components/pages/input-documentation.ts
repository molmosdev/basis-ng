import { Component } from '@angular/core';
import { Input, Alert } from 'primitives';
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
  selector: 'article[app-input-documentation]',
  imports: [
    Input,
    CodeBlock,
    FormsModule,
    ReactiveFormsModule,
    StepsButtons,
    Alert,
  ],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Drawer', path: '/docs/components/drawer' }"
      [next]="{
        label: 'Input Group',
        path: '/docs/components/input-group',
      }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Input</h1>
    <div class="flex flex-col gap-4">
      <span> Input is a custom input component with additional features. </span>
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
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                size
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">'md'</b> | 'sm' | 'lg'
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                type
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">'text'</b> | 'number' | 'password' |
                'email'
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                decimals
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">2</b> | number
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                numberType
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 font-display-mono whitespace-nowrap">
                <b class="font-bold">'integer'</b> | 'decimal'
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic</h2>
      <code-block [code]="ngModelUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <input
          b-input
          type="text"
          placeholder="Enter text"
          [(ngModel)]="ngModelValue" />
      </div>
      <h2 class="font-semibold text-xl">Number Input (Integer)</h2>
      <code-block [code]="numberIntegerUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <input
          b-input
          type="number"
          numberType="integer"
          placeholder="Enter an integer"
          [(ngModel)]="integerValue" />
      </div>
      <h2 class="font-semibold text-xl">Number Input (Decimal)</h2>
      <code-block [code]="numberDecimalUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <input
          b-input
          type="number"
          numberType="decimal"
          [decimals]="2"
          placeholder="Enter a decimal number"
          [(ngModel)]="decimalValue" />
      </div>
      <h2 class="font-semibold text-xl">Input Sizes</h2>
      <code-block [code]="sizeUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <input b-input type="text" size="sm" placeholder="Size sm" />
        <input b-input type="text" size="md" placeholder="Size md" />
        <input b-input type="text" size="lg" placeholder="Size lg" />
      </div>
      <h2 class="font-semibold text-xl">Reactive Forms</h2>
      <code-block [code]="formControlUsage" />
      <form
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4"
        [formGroup]="form">
        <input
          b-input
          type="text"
          placeholder="Enter text"
          formControlName="inputControl" />
      </form>
      <h2 class="font-semibold text-xl">Password Input</h2>
      <code-block [code]="passwordUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <input
          b-input
          type="password"
          placeholder="Enter password"
          [(ngModel)]="passwordValue" />
      </div>
      <h2 class="font-semibold text-xl">Disabled Input</h2>
      <code-block [code]="disabledUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4">
        <input
          b-input
          type="text"
          placeholder="Disabled input"
          [disabled]="true" />
      </div>
      <h2 class="font-semibold text-xl">Invalid Input</h2>
      <code-block [code]="invalidUsage" />
      <form
        class="border border-gray-200 dark:border-neutral-700 rounded-lg p-6 mb-6 bg-white dark:bg-neutral-900 documentation-playground flex flex-col items-center justify-center gap-4"
        [formGroup]="form">
        <input
          b-input
          type="text"
          placeholder="Invalid input"
          formControlName="invalidControl" />
      </form>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Drawer', path: '/docs/components/drawer' }"
      [next]="{
        label: 'Input Group',
        path: '/docs/components/input-group',
      }" />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class InputDocumentation {
  angularImport = `import { Input } from 'primitives'`;
  stylesImport = `@import '@basis-ng/styles/input';`;
  ngModelUsage = `<input b-input type="text" placeholder="Enter text" [(ngModel)]="ngModelValue" />`;
  formControlUsage = `<form [formGroup]="form">
  <input b-input type="text" placeholder="Enter text" formControlName="inputControl" />
</form>`;
  passwordUsage = `<input b-input type="password" placeholder="Enter password" [(ngModel)]="passwordValue" />`;
  withInputUsage = `<b-label>
  <label>Input Label</label>
  <input b-input type="text" />
</b-label>`;
  numberIntegerUsage = `<input b-input type="number" numberType="integer" placeholder="Enter an integer" [(ngModel)]="integerValue" />`;
  numberDecimalUsage = `<input b-input type="number" numberType="decimal" [decimals]="2" placeholder="Enter a decimal number" [(ngModel)]="decimalValue" />`;
  sizeUsage = `<input b-input type="text" size="sm" placeholder="Size sm" />
<input b-input type="text" size="md" placeholder="Size md" />
<input b-input type="text" size="lg" placeholder="Size lg" />`;
  disabledUsage = `<input b-input type="text" placeholder="Disabled input" [disabled]="true" />`;
  invalidUsage = `<form [formGroup]="form">
  <input b-input type="text" placeholder="Invalid input" formControlName="invalidControl" />
</form>`;

  ngModelValue = 'Hello World!';
  passwordValue = 'kñl23jkjf2i';
  integerValue = 42;
  decimalValue = 3.14;
  form = new FormGroup({
    inputControl: new FormControl('Hello World from FormControl!'),
    invalidControl: new FormControl('', {
      validators: () => ({ invalid: true }),
    }),
  });
}
