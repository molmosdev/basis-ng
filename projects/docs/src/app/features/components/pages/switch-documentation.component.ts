import { Component } from '@angular/core';
import { Label, Switch, Alert } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'article[app-switch-documentation]',
  template: `<b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Switch</h1>
    <span> Switch is a custom toggle component with additional features. </span>

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
          <td><strong>value</strong></td>
          <td><code>boolean</code></td>
          <td>The value of the switch.</td>
        </tr>
        <tr>
          <td><strong>size</strong></td>
          <td><code>'default' | 'large'</code></td>
          <td>The size of the switch.</td>
        </tr>
        <tr>
          <td><strong>disabled</strong></td>
          <td><code>boolean</code></td>
          <td>Whether the switch is disabled.</td>
        </tr>
        <tr>
          <td><strong>invalid</strong></td>
          <td><code>boolean</code></td>
          <td>Whether the switch is invalid.</td>
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
          <td>Emitted when the value of the switch changes.</td>
        </tr>
      </table>
    </div>

    <h2>Basic</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <input
        type="checkbox"
        b-switch
        [value]="basicValue"
        (valueChange)="onValueChange($event)" />
    </div>

    <h2>Angular Binding with ngModel</h2>
    <code-block [code]="ngModelUsage" />
    <div class="documentation-playground">
      <input type="checkbox" b-switch [(ngModel)]="ngModelValue" />
    </div>

    <h2>Angular Forms with formControlName</h2>
    <code-block [code]="formControlUsage" />
    <form [formGroup]="form">
      <div class="documentation-playground">
        <input type="checkbox" b-switch formControlName="switchControl" />
      </div>
    </form>

    <h2>With Label</h2>
    <code-block [code]="withLabelUsage" />
    <div class="documentation-playground">
      <b-label>
        <input type="checkbox" b-switch id="switch-label" />
        <label for="switch-label">Switch Label</label>
      </b-label>
    </div>`,
  imports: [
    CodeBlockComponent,
    Switch,
    FormsModule,
    ReactiveFormsModule,
    Label,
    Alert,
  ],
})
export default class SwitchDocumentationComponent {
  angularImport = `import { Switch } from '@basis-ng/primitives'`;
  basicUsage = `<input type="checkbox" b-switch [value]="basicValue" (valueChange)="onValueChange($event)" />`;
  ngModelUsage = `<input type="checkbox" b-switch [(ngModel)]="ngModelValue" />`;
  formControlUsage = `<input type="checkbox" b-switch formControlName="switchControl" />`;
  withLabelUsage = `<b-label>
  <input type="checkbox" b-switch id="switch-label" />
  <label for="switch-label">Switch Label</label>
</b-label>`;

  basicValue = false;
  ngModelValue = false;
  form = new FormGroup({
    switchControl: new FormControl(false),
  });

  onValueChange(value: boolean) {
    console.log('Switch value changed:', value);
  }
}
