import { Component } from '@angular/core';
import {
  AlertComponent,
  SelectComponent,
  OptionComponent,
  SelectOptionsComponent,
} from '../../../../../../../../primitives/src/public-api';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

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

    <h2>Basic Usage</h2>
    <code-block [code]="formsModuleUsage" />
    <div class="documentation-playground">
      <b-select [(ngModel)]="selectedOption">
        <ul b-select-options [multiple]="false">
          <li b-option value="option1">Option 1</li>
          <li b-option value="option2">Option 2</li>
          <li b-option value="option3">Option 3</li>
        </ul>
      </b-select>
    </div>

    <h2>Multiple Selection</h2>
    <code-block [code]="multipleUsage" />
    <div class="documentation-playground">
      <b-select [(ngModel)]="selectedMultiple">
        <ul b-select-options [multiple]="true">
          <li b-option value="option1">Option 1</li>
          <li b-option value="option2">Option 2</li>
          <li b-option value="option3">Option 3</li>
        </ul>
      </b-select>
    </div>

    <h2>Reactive Forms</h2>
    <code-block [code]="reactiveFormsUsage" />
    <div class="documentation-playground">
      <form [formGroup]="formGroup">
        <b-select formControlName="selectControl">
          <ul b-select-options [multiple]="false">
            <li b-option value="option1">Option 1</li>
            <li b-option value="option2">Option 2</li>
            <li b-option value="option3">Option 3</li>
          </ul>
        </b-select>
      </form>
    </div>

    <h2>Custom Max Width</h2>
    <code-block [code]="customMaxWidthUsage" />
    <div class="documentation-playground">
      <b-select placeholder="Select an option" maxWidth="240px">
        <ul b-select-options [multiple]="false">
          <li b-option value="option1">Option 1</li>
          <li b-option value="option2">Option 2</li>
          <li b-option value="option3">Option 3</li>
        </ul>
      </b-select>
    </div>

    <h2>With no options message</h2>
    <code-block [code]="noOptionsMessageUsage" />
    <div class="documentation-playground">
      <b-select placeholder="Select an option">
        <ul b-select-options noOptionsMessage="No options available">
          <!-- No options -->
        </ul>
      </b-select>
    </div>

    <h2>Disabled Option</h2>
    <code-block [code]="disabledOptionUsage" />
    <div class="documentation-playground">
      <b-select [(ngModel)]="selectedOption">
        <ul b-select-options [multiple]="false">
          <li b-option value="option1">Option 1</li>
          <li b-option value="option2" [disabled]="true">
            Option 2 (Disabled)
          </li>
          <li b-option value="option3">Option 3</li>
        </ul>
      </b-select>
    </div>`,
  imports: [
    CodeBlockComponent,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    SelectComponent,
    SelectOptionsComponent,
    OptionComponent,
  ],
})
export default class SelectDocumentationComponent {
  angularImport = `import { SelectComponent, SelectOptionsComponent, OptionComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/select';
@import '@basis-ng/styles/options-list';
@import '@basis-ng/styles/option';`;

  selectedOption = ['option2'];
  selectedMultiple = ['option1', 'option3'];
  formGroup = new FormGroup({
    selectControl: new FormControl(['option3']),
  });

  formsModuleUsage = `<b-select [(ngModel)]="selectedOption">
  <ul b-select-options [multiple]="false">
    <li b-option value="option1">Option 1</li>
    <li b-option value="option2">Option 2</li>
    <li b-option value="option3">Option 3</li>
  </ul>
</b-select>`;

  multipleUsage = `<b-select [(ngModel)]="selectedMultiple">
  <ul b-select-options [multiple]="true">
    <li b-option value="option1">Option 1</li>
    <li b-option value="option2">Option 2</li>
    <li b-option value="option3">Option 3</li>
  </ul>
</b-select>`;

  reactiveFormsUsage = `<form [formGroup]="formGroup">
  <b-select formControlName="selectControl">
    <ul b-select-options [multiple]="false">
      <li b-option value="option1">Option 1</li>
      <li b-option value="option2">Option 2</li>
      <li b-option value="option3">Option 3</li>
    </ul>
  </b-select>
</form>`;

  customMaxWidthUsage = `<b-select placeholder="Select an option" maxWidth="240px">
  <ul b-select-options [multiple]="false">
    <li b-option value="option1">Option 1</li>
    <li b-option value="option2">Option 2</li>
    <li b-option value="option3">Option 3</li>
  </ul>
</b-select>`;

  noOptionsMessageUsage = `<b-select placeholder="Select an option">
  <ul b-select-options noOptionsMessage="No options available">
    <!-- No options -->
  </ul>
</b-select>`;

  disabledOptionUsage = `<b-select [(ngModel)]="selectedOption">
  <ul b-select-options [multiple]="false">
    <li b-option value="option1">Option 1</li>
    <li b-option value="option2" [disabled]="true">Option 2 (Disabled)</li>
    <li b-option value="option3">Option 3</li>
  </ul>
</b-select>`;
}
