import { Component } from '@angular/core';
import { Select, Label, Alert } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'article[app-select-documentation]',
  template: `<b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Select</h1>
    <span>
      Select is a custom dropdown component with additional features.
    </span>

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
          <td><strong>disabled</strong></td>
          <td><code>boolean</code></td>
          <td>Whether the select is disabled.</td>
        </tr>
        <tr>
          <td><strong>invalid</strong></td>
          <td><code>boolean</code></td>
          <td>Whether the select is invalid.</td>
        </tr>
        <tr>
          <td><strong>maxWidth</strong></td>
          <td><code>string</code></td>
          <td>The maximum width of the select.</td>
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
          <td><code>string | null</code></td>
          <td>Emitted when the value of the select changes.</td>
        </tr>
      </table>
    </div>

    <h2>Basic</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <select
        b-select
        [value]="basicValue"
        (valueChange)="onValueChange($event)"
        maxWidth="240px">
        <option [value]="null">Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </select>
    </div>

    <h2>Angular Binding with ngModel</h2>
    <code-block [code]="ngModelUsage" />
    <div class="documentation-playground">
      <select b-select [(ngModel)]="ngModelValue" maxWidth="240px">
        <option [value]="null">Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </select>
    </div>

    <h2>Angular Forms with formControlName</h2>
    <code-block [code]="formControlUsage" />
    <form [formGroup]="form">
      <div class="documentation-playground">
        <select b-select formControlName="selectControl" maxWidth="240px">
          <option [value]="null">Select an option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </select>
      </div>
    </form>

    <h2>Disabled</h2>
    <code-block [code]="disabledUsage" />
    <div class="documentation-playground">
      <select b-select [disabled]="true" maxWidth="240px">
        <option [value]="null">Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </select>
    </div>

    <h2>Invalid</h2>
    <code-block [code]="invalidUsage" />
    <div class="documentation-playground">
      <select b-select [invalid]="true" maxWidth="240px">
        <option [value]="null">Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </select>
    </div>

    <h2>With Label</h2>
    <code-block [code]="withSelectUsage" />
    <div class="documentation-playground">
      <b-label>
        <label>Select Label</label>
        <select b-select maxWidth="240px">
          <option [value]="null">Select an option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </select>
      </b-label>
    </div>`,
  imports: [
    CodeBlockComponent,
    Select,
    FormsModule,
    ReactiveFormsModule,
    Label,
    Alert,
  ],
})
export default class SelectDocumentationComponent {
  angularImport = `import { Select } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/select';`;
  basicUsage = `<select b-select [value]="basicValue" (valueChange)="onValueChange($event)" maxWidth="240px">
  <option [value]="null">Select an option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>`;
  ngModelUsage = `<select b-select [(ngModel)]="ngModelValue" maxWidth="240px">
  <option [value]="null">Select an option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>`;
  formControlUsage = `<select b-select formControlName="selectControl" maxWidth="240px">
  <option [value]="null">Select an option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>`;
  disabledUsage = `<select b-select [disabled]="true" maxWidth="240px">
  <option [value]="null">Select an option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>`;
  invalidUsage = `<select b-select [invalid]="true" maxWidth="240px">
  <option [value]="null">Select an option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>`;

  options = [
    { value: null, text: 'Select an option' },
    { value: '1', text: 'Option 1' },
    { value: '2', text: 'Option 2' },
  ];

  basicValue = null;
  ngModelValue = null;
  form = new FormGroup({
    selectControl: new FormControl(null),
  });

  onValueChange(value: string | null) {
    console.log('Select value changed:', value);
  }

  withSelectUsage = `<b-label>
  <label>Select Label</label>
  <select b-select maxWidth="240px">
    <option [value]="null">Select an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
</b-label>`;
}
