import { Component } from '@angular/core';
import { Input, Label, Alert } from '@basis-ng/primitives';
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

    <h2>Properties</h2>
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Description</th>
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
          <td><strong>invalid</strong></td>
          <td><code>boolean</code></td>
          <td>Whether the input is invalid.</td>
        </tr>
        <tr>
          <td><strong>disabled</strong></td>
          <td><code>boolean</code></td>
          <td>Whether the input is disabled.</td>
        </tr>
        <tr>
          <td><strong>maxWidth</strong></td>
          <td><code>string</code></td>
          <td>The maximum width of the input.</td>
        </tr>
        <tr>
          <td><strong>decimals</strong></td>
          <td><code>number</code></td>
          <td>The number of decimal places for number input.</td>
        </tr>
        <tr>
          <td><strong>numberType</strong></td>
          <td><code>'integer' | 'decimal'</code></td>
          <td>The type of number input (integer or decimal).</td>
        </tr>
      </table>
    </div>

    <h2>Events</h2>
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Event</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><strong>valueChange</strong></td>
          <td><code>string | number | null</code></td>
          <td>Emitted when the value of the input changes.</td>
        </tr>
      </table>
    </div>

    <h2>Basic</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <input
        b-input
        type="text"
        placeholder="Enter text"
        [value]="basicValue"
        (valueChange)="onValueChange($event)"
        maxWidth="240px" />
    </div>

    <h2>Angular Binding with ngModel</h2>
    <code-block [code]="ngModelUsage" />
    <div class="documentation-playground">
      <input
        b-input
        type="text"
        placeholder="Enter text"
        [(ngModel)]="ngModelValue"
        maxWidth="240px" />
    </div>

    <h2>Angular Forms with formControlName</h2>
    <code-block [code]="formControlUsage" />
    <form [formGroup]="form">
      <div class="documentation-playground">
        <input
          b-input
          type="text"
          placeholder="Enter text"
          formControlName="inputControl"
          maxWidth="240px" />
      </div>
    </form>

    <h2>Disabled</h2>
    <code-block [code]="disabledUsage" />
    <div class="documentation-playground">
      <input
        b-input
        type="text"
        placeholder="Enter text"
        [disabled]="true"
        maxWidth="240px" />
    </div>

    <h2>Invalid</h2>
    <code-block [code]="invalidUsage" />
    <div class="documentation-playground">
      <input
        b-input
        type="text"
        placeholder="Enter text"
        [invalid]="true"
        maxWidth="240px" />
    </div>

    <h2>Number Input with Decimals</h2>
    <code-block [code]="decimalsUsage" />
    <div class="documentation-playground">
      <input
        b-input
        type="number"
        placeholder="Enter number"
        numberType="decimal"
        [decimals]="2"
        maxWidth="240px" />
    </div>

    <h2>Number Input with Integer Type</h2>
    <code-block [code]="integerUsage" />
    <div class="documentation-playground">
      <input
        b-input
        type="number"
        placeholder="Enter integer"
        numberType="integer"
        maxWidth="240px" />
    </div>

    <h2>Password Input</h2>
    <code-block [code]="passwordUsage" />
    <div class="documentation-playground">
      <input
        b-input
        type="password"
        placeholder="Enter password"
        maxWidth="240px" />
    </div>

    <h2>With Label</h2>
    <code-block [code]="withInputUsage" />
    <div class="documentation-playground">
      <b-label>
        <label>Input Label</label>
        <input b-input type="text" maxWidth="240px" />
      </b-label>
    </div>`,
  imports: [
    CodeBlockComponent,
    Input,
    FormsModule,
    ReactiveFormsModule,
    Label,
    Alert,
  ],
})
export default class InputDocumentationComponent {
  angularImport = `import { Input } from '@basis-ng/primitives'`;
  basicUsage = `<input b-input type="text" placeholder="Enter text" [value]="basicValue" (valueChange)="onValueChange($event)" maxWidth="240px" />`;
  ngModelUsage = `<input b-input type="text" placeholder="Enter text" [(ngModel)]="ngModelValue" maxWidth="240px" />`;
  formControlUsage = `<form [formGroup]="form">
  <input b-input type="text" placeholder="Enter text" formControlName="inputControl" maxWidth="240px" />
</form>`;
  disabledUsage = `<input b-input type="text" placeholder="Enter text" [disabled]="true" maxWidth="240px" />`;
  invalidUsage = `<input b-input type="text" placeholder="Enter text" [invalid]="true" maxWidth="240px" />`;
  decimalsUsage = `<input b-input type="number" placeholder="Enter number" numberType="decimal" [decimals]="2" maxWidth="240px" />`;
  integerUsage = `<input b-input type="number" placeholder="Enter integer" numberType="integer" maxWidth="240px" />`;
  passwordUsage = `<input b-input type="password" placeholder="Enter password" maxWidth="240px" />`;
  withInputUsage = `<b-label>
  <label>Input Label</label>
  <input b-input type="text" maxWidth="240px" />
</b-label>`;

  basicValue = '';
  ngModelValue = '';
  form = new FormGroup({
    inputControl: new FormControl(''),
  });

  onValueChange(value: string | number | null) {
    console.log('Input value changed:', value);
  }
}
