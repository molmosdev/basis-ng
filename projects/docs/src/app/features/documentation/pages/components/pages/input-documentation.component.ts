import { Component } from '@angular/core';
import { AlertComponent, InputComponent } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'article[app-input-documentation]',
  template: `<b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Input</h1>
    <span> Input is a custom input component with additional features. </span>

    <code-block [code]="angularImport" />
    <span
      >Include this to apply predefined styles. The component is headless
      without it.</span
    >
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
          <td>The size of the input. Default is <code>'2'</code>.</td>
        </tr>
        <tr>
          <td><strong>type</strong></td>
          <td><code>'text' | 'number' | 'password' | 'email'</code></td>
          <td>The type of the input.</td>
        </tr>
        <tr>
          <td><strong>placeholder</strong></td>
          <td><code>string</code></td>
          <td>The placeholder text for the input.</td>
        </tr>
        <tr>
          <td><strong>value</strong></td>
          <td><code>string | number | null</code></td>
          <td>The value of the input.</td>
        </tr>
        <tr>
          <td><strong>numberType</strong></td>
          <td><code>'integer' | 'decimal'</code></td>
          <td>The type of number input.</td>
        </tr>
        <tr>
          <td><strong>decimals</strong></td>
          <td><code>number</code></td>
          <td>The number of decimal places for decimal inputs.</td>
        </tr>
        <tr>
          <td><strong>maxWidth</strong></td>
          <td><code>string</code></td>
          <td>The maximum width of the input.</td>
        </tr>
      </table>
    </div>

    <h2>Basic</h2>
    <code-block [code]="ngModelUsage" />
    <div class="documentation-playground">
      <input
        b-input
        type="text"
        placeholder="Enter text"
        [(ngModel)]="ngModelValue" />
    </div>

    <h2>Number Input (Integer)</h2>
    <code-block [code]="numberIntegerUsage" />
    <div class="documentation-playground">
      <input
        b-input
        type="number"
        numberType="integer"
        placeholder="Enter an integer"
        [(ngModel)]="integerValue" />
    </div>

    <h2>Number Input (Decimal)</h2>
    <code-block [code]="numberDecimalUsage" />
    <div class="documentation-playground">
      <input
        b-input
        type="number"
        numberType="decimal"
        [decimals]="2"
        placeholder="Enter a decimal number"
        [(ngModel)]="decimalValue" />
    </div>

    <h2>Input Sizes</h2>
    <code-block [code]="sizeUsage" />
    <div class="documentation-playground">
      <input b-input type="text" size="1" placeholder="Size 1" />
      <input b-input type="text" size="2" placeholder="Size 2" />
      <input b-input type="text" size="3" placeholder="Size 3" />
    </div>

    <h2>Reactive Forms</h2>
    <code-block [code]="formControlUsage" />
    <form [formGroup]="form">
      <div class="documentation-playground">
        <input
          b-input
          type="text"
          placeholder="Enter text"
          formControlName="inputControl" />
      </div>
    </form>

    <h2>Password Input</h2>
    <code-block [code]="passwordUsage" />
    <div class="documentation-playground">
      <input
        b-input
        type="password"
        placeholder="Enter password"
        [(ngModel)]="passwordValue" />
    </div>

    <h2>Disabled Input</h2>
    <span
      >The <code>disabled</code> state is applied by Angular's
      <code>NgModel</code> or Reactive Forms.</span
    >
    <code-block [code]="disabledUsage" />
    <div class="documentation-playground">
      <input
        b-input
        type="text"
        placeholder="Disabled input"
        [disabled]="true" />
    </div>

    <h2>Invalid Input</h2>
    <span
      >The <code>invalid</code> state is applied by Angular's
      <code>NgModel</code> or Reactive Forms when validation fails.</span
    >
    <code-block [code]="invalidUsage" />
    <form [formGroup]="form">
      <div class="documentation-playground">
        <input
          b-input
          type="text"
          placeholder="Invalid input"
          formControlName="invalidControl" />
      </div>
    </form>

    <h2>Max Width</h2>
    <span
      >The <code>maxWidth</code> property allows you to set a maximum width for
      the input.</span
    >
    <code-block [code]="maxWidthUsage" />
    <div class="documentation-playground">
      <input
        b-input
        type="text"
        placeholder="Input with max width"
        [maxWidth]="'200px'" />
    </div>`,
  imports: [
    CodeBlockComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
  ],
})
export default class InputDocumentationComponent {
  angularImport = `import { InputComponent } from '@basis-ng/primitives'`;
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
  sizeUsage = `<input b-input type="text" size="1" placeholder="Size 1" />
<input b-input type="text" size="2" placeholder="Size 2" />
<input b-input type="text" size="3" placeholder="Size 3" />`;
  disabledUsage = `<input b-input type="text" placeholder="Disabled input" [disabled]="true" />`;
  invalidUsage = `<form [formGroup]="form">
  <input b-input type="text" placeholder="Invalid input" formControlName="invalidControl" />
</form>`;
  maxWidthUsage = `<input b-input type="text" placeholder="Input with max width" [maxWidth]="'200px'" />`;

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
