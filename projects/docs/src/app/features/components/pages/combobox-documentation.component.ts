import { Component } from '@angular/core';
import {
  Alert,
  ComboboxComponent,
  CommandComponent,
  CommandOptionsComponent,
  OptionComponent,
} from '../../../../../../primitives/src/public-api';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'article[app-combobox-documentation]',
  template: `<b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Combobox</h1>
    <span>
      Combobox is a dropdown component with advanced features like keyboard
      navigation and accessibility.
    </span>

    <code-block [code]="angularImport" />
    <span
      >Include this to apply predefined styles. The component is headless
      without it.</span
    >
    <code-block [code]="stylesImport" />

    <h2>Basic Usage</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <b-combobox [(ngModel)]="selectedOption">
        <b-command>
          <ul b-command-options>
            <li b-option value="option1">Option 1</li>
            <li b-option value="option2">Option 2</li>
            <li b-option value="option3">Option 3</li>
          </ul>
        </b-command>
      </b-combobox>
    </div>

    <h2>Reactive Forms</h2>
    <code-block [code]="reactiveFormsUsage" />
    <div class="documentation-playground">
      <form [formGroup]="formGroup">
        <b-combobox formControlName="comboboxControl">
          <b-command>
            <ul b-command-options>
              <li b-option value="option1">Option 1</li>
              <li b-option value="option2">Option 2</li>
              <li b-option value="option3">Option 3</li>
            </ul>
          </b-command>
        </b-combobox>
      </form>
    </div>

    <h2>Custom Max Width</h2>
    <code-block [code]="customMaxWidthUsage" />
    <div class="documentation-playground">
      <b-combobox placeholder="Select an option" maxWidth="240px">
        <b-command>
          <ul b-command-options>
            <li b-option value="option1">Option 1</li>
            <li b-option value="option2">Option 2</li>
            <li b-option value="option3">Option 3</li>
          </ul>
        </b-command>
      </b-combobox>
    </div>`,
  imports: [
    CodeBlockComponent,
    FormsModule,
    ReactiveFormsModule,
    Alert,
    ComboboxComponent,
    CommandComponent,
    CommandOptionsComponent,
    OptionComponent,
  ],
})
export default class ComboboxDocumentationComponent {
  angularImport = `import { ComboboxComponent, CommandComponent, CommandOptionsComponent, OptionComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/combobox';
@import '@basis-ng/styles/command';
@import '@basis-ng/styles/command-options';
@import '@basis-ng/styles/option';`;

  selectedOption = ['option2'];
  formGroup = new FormGroup({
    comboboxControl: new FormControl(['option3']),
  });

  basicUsage = `<b-combobox [(ngModel)]="selectedOption">
  <b-command>
    <ul b-command-options>
      <li b-option value="option1">Option 1</li>
      <li b-option value="option2">Option 2</li>
      <li b-option value="option3">Option 3</li>
    </ul>
  </b-command>
</b-combobox>`;

  reactiveFormsUsage = `<form [formGroup]="formGroup">
  <b-combobox formControlName="comboboxControl">
    <b-command>
      <ul b-command-options>
        <li b-option value="option1">Option 1</li>
        <li b-option value="option2">Option 2</li>
        <li b-option value="option3">Option 3</li>
      </ul>
    </b-command>
  </b-combobox>
</form>`;

  customMaxWidthUsage = `<b-combobox placeholder="Select an option" maxWidth="240px">
  <b-command>
    <ul b-command-options>
      <li b-option value="option1">Option 1</li>
      <li b-option value="option2">Option 2</li>
      <li b-option value="option3">Option 3</li>
    </ul>
  </b-command>
</b-combobox>`;
}
