import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { Alert, Range } from 'primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'article[app-range-documentation]',
  imports: [
    CodeBlock,
    Range,
    StepsButtons,
    Alert,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'OTP', path: '/docs/components/otp' }"
      [next]="{ label: 'Select', path: '/docs/components/select' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl">Range</h1>
    <div class="flex flex-col gap-4">
      <span> Range is a custom slider component. </span>
      <code-block [code]="angularImport" />
      <span>
        Include this to apply predefined styles. The component is headless
        without it.
      </span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Basic (ngModel)</h2>
      <code-block [code]="ngModelUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4">
        <input type="range" b-range [(ngModel)]="ngModelValue" />
        <span>Value: {{ ngModelValue }}</span>
      </div>

      <h2 class="font-semibold text-xl">Reactive Forms</h2>
      <code-block [code]="formControlUsage" />
      <form
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4"
        [formGroup]="form">
        <input type="range" b-range formControlName="rangeControl" />
        <span>Value: {{ form.get('rangeControl')?.value }}</span>
      </form>

      <h2 class="font-semibold text-xl">Range Sizes</h2>
      <code-block [code]="sizeUsage" />
      <div
        class="border border-gray-200 gap-y-8 dark:border-neutral-700 rounded-lg p-6 mb-6 flex flex-col items-center justify-center gap-4">
        <input b-range type="range" class="b-size-sm" />
        <input b-range type="range" class="b-size-md" />
        <input b-range type="range" class="b-size-lg" />
      </div>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'OTP', path: '/docs/components/otp' }"
      [next]="{ label: 'Select', path: '/docs/components/select' }" />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class RangeDocumentation {
  angularImport = `import { Range } from 'primitives'`;
  stylesImport = `@import '@basis-ng/styles/range';`;
  ngModelUsage = `<input type="range" b-range [(ngModel)]="ngModelValue" />`;
  formControlUsage = `<form [formGroup]="form">
  <input type="range" b-range formControlName="rangeControl" />
</form>`;
  sizeUsage = `<input b-range type="range" class="b-size-sm" />\n<input b-range type="range" class="b-size-md" />\n<input b-range type="range" class="b-size-lg" />`;
  ngModelValue = 50;
  form = new FormGroup({
    rangeControl: new FormControl(25),
  });
}
