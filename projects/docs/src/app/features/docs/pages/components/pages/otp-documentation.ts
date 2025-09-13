import { Component } from '@angular/core';
import { CodeBlock } from '../shared/components/code-block';
import {
  OtpComponent,
  OtpDigitDirective,
  Badge,
  Alert,
} from '@basis-ng/primitives';
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
    OtpComponent,
    OtpDigitDirective,
    StepsButtons,
    FormsModule,
    ReactiveFormsModule,
    Badge,
    Alert,
  ],
  providers: [provideIcons({ lucideRocket })],
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
      <span b-badge variant="outlined" size="sm"> New </span>
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
        class="overflow-x-auto overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 mb-6">
        <table class="table-auto w-full text-left text-sm">
          <thead class="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                class="border-b border-gray-200 dark:border-zinc-700 px-4 py-2 font-semibold">
                Property
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
                size
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                '1' | <strong>'2'</strong> | '3'
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                disabled
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                <strong>boolean</strong>
              </td>
            </tr>
            <tr>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                b-otp-digit
              </td>
              <td
                class="border-t border-gray-200 dark:border-zinc-700 px-4 py-2 font-display-mono">
                directive
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 class="font-semibold text-xl">Basic usage</h2>
      <code-block [code]="ngModelUsage" />
      <div
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
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
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
        <b-otp size="1">
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
        </b-otp>
        <b-otp size="2">
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
          <input b-otp-digit />
        </b-otp>
        <b-otp size="3">
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
        class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
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
          class="border border-gray-200 dark:border-zinc-700 rounded-lg p-6 mb-6 bg-white dark:bg-zinc-900 documentation-playground flex flex-col gap-4 items-center">
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
  host: {
    class:
      'mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col gap-6 px-4 pb-20',
  },
})
export class OtpDocumentation {
  angularImport = `import { OtpComponent, OtpDigitDirective } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/components/otp.component.css';`;
  ngModelUsage = `<b-otp [(ngModel)]='otpValue'>\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n</b-otp>`;
  sizeUsage = `<b-otp size='1'>\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n</b-otp>\n\n<b-otp size='2'>\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n</b-otp>\n\n<b-otp size='3'>\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n</b-otp>`;
  disabledUsage = `<b-otp [disabled]='true'>\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n</b-otp>`;
  invalidUsage = `<form [formGroup]='form'>\n  <b-otp formControlName='invalidControl'>\n    <input b-otp-digit />\n    <input b-otp-digit />\n    <input b-otp-digit />\n    <input b-otp-digit />\n    <input b-otp-digit />\n    <input b-otp-digit />\n  </b-otp>\n</form>`;

  otpValue = '';
  form = new FormGroup({
    invalidControl: new FormControl('', {
      validators: () => ({ invalid: true }),
    }),
  });
}
