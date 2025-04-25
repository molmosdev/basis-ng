import { Component } from '@angular/core';
import { Textarea, Alert } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'article[app-textarea-documentation]',
  template: `<b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Textarea</h1>
    <span>
      Textarea is a custom textarea component with additional features.
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
          <td><strong>placeholder</strong></td>
          <td><code>string</code></td>
          <td>The placeholder text for the textarea.</td>
        </tr>
        <tr>
          <td><strong>value</strong></td>
          <td><code>string | null</code></td>
          <td>The value of the textarea.</td>
        </tr>
        <tr>
          <td><strong>rows</strong></td>
          <td><code>number</code></td>
          <td>The number of rows for the textarea.</td>
        </tr>
        <tr>
          <td><strong>cols</strong></td>
          <td><code>number</code></td>
          <td>The number of columns for the textarea.</td>
        </tr>
        <tr>
          <td><strong>invalid</strong></td>
          <td><code>boolean</code></td>
          <td>Whether the textarea is invalid.</td>
        </tr>
        <tr>
          <td><strong>disabled</strong></td>
          <td><code>boolean</code></td>
          <td>Whether the textarea is disabled.</td>
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
          <td>Emitted when the value of the textarea changes.</td>
        </tr>
      </table>
    </div>

    <h2>Basic</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <textarea
        b-textarea
        placeholder="Enter text"
        [value]="basicValue"
        (valueChange)="onValueChange($event)"></textarea>
    </div>

    <h2>Angular Binding with ngModel</h2>
    <code-block [code]="ngModelUsage" />
    <div class="documentation-playground">
      <textarea
        b-textarea
        placeholder="Enter text"
        [(ngModel)]="ngModelValue"></textarea>
    </div>

    <h2>Angular Forms with formControlName</h2>
    <code-block [code]="formControlUsage" />
    <form [formGroup]="form">
      <div class="documentation-playground">
        <textarea
          b-textarea
          placeholder="Enter text"
          formControlName="textareaControl"></textarea>
      </div>
    </form>

    <h2>Disabled</h2>
    <code-block [code]="disabledUsage" />
    <div class="documentation-playground">
      <textarea
        b-textarea
        placeholder="Enter text"
        [disabled]="true"></textarea>
    </div>

    <h2>Invalid</h2>
    <code-block [code]="invalidUsage" />
    <div class="documentation-playground">
      <textarea b-textarea placeholder="Enter text" [invalid]="true"></textarea>
    </div> `,
  imports: [
    CodeBlockComponent,
    Textarea,
    FormsModule,
    ReactiveFormsModule,
    Alert,
  ],
})
export default class TextareaDocumentationComponent {
  angularImport = `import { Textarea } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/textarea';`;
  basicUsage = `<textarea b-textarea placeholder="Enter text" [value]="basicValue" (valueChange)="onValueChange($event)"></textarea>`;
  ngModelUsage = `<textarea b-textarea placeholder="Enter text" [(ngModel)]="ngModelValue"></textarea>`;
  formControlUsage = `<form [formGroup]="form">
  <textarea b-textarea placeholder="Enter text" formControlName="textareaControl"></textarea>
</form>`;
  disabledUsage = `<textarea b-textarea placeholder="Enter text" [disabled]="true"></textarea>`;
  invalidUsage = `<textarea b-textarea placeholder="Enter text" [invalid]="true"></textarea>`;

  basicValue = '';
  ngModelValue = '';
  form = new FormGroup({
    textareaControl: new FormControl(''),
  });

  onValueChange(value: string | null) {
    console.log('Textarea value changed:', value);
  }
}
