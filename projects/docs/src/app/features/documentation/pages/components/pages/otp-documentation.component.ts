import { Component } from '@angular/core';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import {
  AlertComponent,
  OtpComponent,
  OtpDigitDirective,
} from '@basis-ng/primitives';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'article[app-otp-documentation]',
  template: `
    <b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>OTP</h1>
    <span>
      OTP is an input component for one-time codes (One Time Password). It
      accepts any character, limited to one per input.
    </span>

    <code-block [code]="angularImport" />
    <span>
      Includes styles for the OTP component. The component is headless without
      them.
    </span>
    <code-block [code]="stylesImport" />

    <h2>Properties</h2>
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><strong>size</strong></td>
          <td><code>'1' | '2' | '3'</code></td>
          <td>Visual size of the input. Default is <code>'2'</code>.</td>
        </tr>
        <tr>
          <td><strong>disabled</strong></td>
          <td><code>boolean</code></td>
          <td>Disables the OTP component.</td>
        </tr>
        <tr>
          <td><strong>b-otp-digit</strong></td>
          <td><code>directive</code></td>
          <td>Allows any character, limited to one character per input.</td>
        </tr>
      </table>
    </div>

    <h2>Basic usage</h2>
    <code-block [code]="ngModelUsage" />
    <div class="documentation-playground">
      <b-otp [(ngModel)]="otpValue">
        <input b-otp-digit />
        <input b-otp-digit />
        <input b-otp-digit />
        <input b-otp-digit />
        <input b-otp-digit />
        <input b-otp-digit />
      </b-otp>
    </div>

    <h2>Sizes</h2>
    <code-block [code]="sizeUsage" />
    <div
      class="documentation-playground"
      [style.flex-direction]="'column'"
      [style.align-items]="'center'">
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

    <h2>Disabled</h2>
    <code-block [code]="disabledUsage" />
    <div class="documentation-playground">
      <b-otp [disabled]="true">
        <input b-otp-digit />
        <input b-otp-digit />
        <input b-otp-digit />
        <input b-otp-digit />
        <input b-otp-digit />
        <input b-otp-digit />
      </b-otp>
    </div>

    <h2>Invalid</h2>
    <code-block [code]="invalidUsage" />
    <form [formGroup]="form">
      <div class="documentation-playground">
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
  `,
  imports: [
    CodeBlockComponent,
    OtpComponent,
    OtpDigitDirective,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
  ],
})
export default class OtpDocumentationComponent {
  angularImport = `import { OtpComponent, OtpDigitDirective } from '@basis-ng/primitives';`;
  stylesImport = `@import '@basis-ng/styles/components/otp.component.css';`;
  ngModelUsage = `<b-otp [(ngModel)]='otpValue'>\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n</b-otp>`;
  sizeUsage = `<b-otp size='1'>\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n</b-otp>\n\n<b-otp size='2'>\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n</b-otp>\n\n<b-otp size='3'>\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n</b-otp>`;
  disabledUsage = `<b-otp [disabled]='true'>\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n  <input b-otp-digit />\n</b-otp>`;
  invalidUsage = `<form [formGroup]='form'>\n  <b-otp formControlName='invalidControl'>\n    <input b-otp-digit />\n    <input b-otp-digit />\n    <input b-otp-digit />\n    <input b-otp-digit />\n    <input b-otp-digit />\n    <input b-otp-digit />\n  </b-otp>\n</form>`;
  maxWidthUsage = ``;

  otpValue = '';
  form = new FormGroup({
    invalidControl: new FormControl('', {
      validators: () => ({ invalid: true }),
    }),
  });
}
