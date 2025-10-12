import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import { Otp, OtpDigitDirective, Badge, Alert } from '@basis-ng/primitives';
import { StepsButtons } from '../../shared/components/steps-buttons';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideRocket } from '@ng-icons/lucide';

@Component({
  selector: 'article[app-otp-documentation]',
  imports: [
    CodeBlock,
    Otp,
    OtpDigitDirective,
    StepsButtons,
    FormsModule,
    ReactiveFormsModule,
    Badge,
    Alert,
  ],
  template: `
    <app-steps-buttons
      [previous]="{ label: 'Menu', path: '/docs/components/menu' }"
      [next]="{ label: 'Range', path: '/docs/components/range' }" />
    <b-alert icon="lucideRocket" title="Components are in alpha">
      Components are in alpha Try them out! We'd love to hear your feedback!
      Expect breaking changes!
    </b-alert>
    <h1 class="font-bold text-2xl flex gap-2 items-start">
      OTP
      <span b-badge class="b-variant-outlined b-size-sm"> New </span>
    </h1>
    <div class="flex flex-col gap-4">
      <span>
        OTP is an input component for one-time codes (One Time Password). It
        accepts any character, limited to one per input.
      </span>
      <code-block [code]="angularImport" />
      <span>
        Include this to apply predefined styles. The component is headless
        without it.
      </span>
      <code-block [code]="stylesImport" />
      <h2 class="font-semibold text-xl">Properties</h2>
      <div
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-neutral-900">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Property
              </th>
              <th
                class="border-b border-gray-200 dark:border-neutral-900 px-4 py-2 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap">
                disabled
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap">
                <strong>boolean</strong>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap">
                b-otp-digit
              </td>
              <td
                class="border-t border-gray-200 dark:border-neutral-900 px-4 py-2 font-display-mono whitespace-nowrap">
                directive
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic usage</h2>
      <code-block [code]="ngModelUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-4 items-center">
        <b-otp [(ngModel)]="otpValue">
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
        </b-otp>
      </div>
      <h2 class="font-semibold text-xl">Sizes</h2>
      <code-block [code]="sizeUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-4 items-center">
        <b-otp class="b-size-sm">
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
        </b-otp>
        <b-otp class="b-size-md">
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
        </b-otp>
        <b-otp class="b-size-lg">
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
        </b-otp>
      </div>
      <h2 class="font-semibold text-xl">Disabled</h2>
      <code-block [code]="disabledUsage" />
      <div
        class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-4 items-center">
        <b-otp [disabled]="true">
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
        </b-otp>
      </div>
      <h2 class="font-semibold text-xl">Invalid</h2>
      <code-block [code]="invalidUsage" />
      <form [formGroup]="form">
        <div
          class="border border-gray-200 dark:border-neutral-900 rounded-lg p-6 mb-6 flex flex-col gap-4 items-center">
          <b-otp formControlName="invalidControl">
            <input b-otp-digit />
            <input b-otp-digit />
            <input b-otp-digit />
            <input b-otp-digit />
            <input b-otp-digit />
            <input b-otp-digit />
          </b-otp>
        </div>
      </form>
    </div>
    <app-steps-buttons
      [previous]="{ label: 'Menu', path: '/docs/components/menu' }"
      [next]="{ label: 'Range', path: '/docs/components/range' }" />
  `,
  providers: [provideIcons({ lucideRocket })],
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-6 sm:pb-20',
  },
})
export class OtpDocumentation {
  angularImport = `import { Otp, OtpDigitDirective } from '@basis-ng/primitives' `;
  stylesImport = `@import '@basis-ng/styles/components/otp.css';`;
  ngModelUsage = `<b-otp [(ngModel)]='otpValue'>\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n</b-otp>`;
  sizeUsage = `<b-otp class='b-size-sm'>\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n</b-otp>\n\n<b-otp class='b-size-md'>\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n</b-otp>\n\n<b-otp class='b-size-lg'>\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n</b-otp>`;
  disabledUsage = `<b-otp [disabled]='true'>\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n</b-otp>`;
  invalidUsage = `<form [formGroup]='form'>\n  <b-otp formControlName='invalidControl'>\n    <input b-otp-digit />\n    <input b-otp-digit />\n    <input b-otp-digit />\n    <input b-otp-digit />\n    <input b-otp-digit />\n    <input b-otp-digit />\n  </b-otp>\n</form>`;

  otpValue = '';
  form = new FormGroup({
    invalidControl: new FormControl('', {
      validators: () => ({ invalid: true }),
    }),
  });
}
