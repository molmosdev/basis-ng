import { Component } from '@angular/core';
import { Checkbox, AlertComponent } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'article[app-checkbox-documentation]',
  template: `<b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Checkbox</h1>
    <span>Checkbox is a custom toggle component.</span>

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
          <td><strong>value</strong></td>
          <td><code>boolean</code></td>
          <td>The value of the checkbox.</td>
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
          <td><code>boolean</code></td>
          <td>Emitted when the value of the checkbox changes.</td>
        </tr>
      </table>
    </div>

    <h2>Basic</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <input
        type="checkbox"
        b-checkbox
        [value]="basicValue"
        (valueChange)="onValueChange($event)" />
    </div>

    <h2>Angular Binding with ngModel</h2>
    <code-block [code]="ngModelUsage" />
    <div class="documentation-playground">
      <input type="checkbox" b-checkbox [(ngModel)]="ngModelValue" />
    </div>

    <h2>Angular Forms with formControlName</h2>
    <code-block [code]="formControlUsage" />
    <form [formGroup]="form">
      <div class="documentation-playground">
        <input type="checkbox" b-checkbox formControlName="checkboxControl" />
      </div>
    </form> `,
  imports: [
    CodeBlockComponent,
    Checkbox,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
  ],
})
export default class CheckboxDocumentationComponent {
  angularImport = `import { Checkbox } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/checkbox';`;
  basicUsage = `<input type="checkbox" b-checkbox [value]="basicValue" (valueChange)="onValueChange($event)" />`;
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
