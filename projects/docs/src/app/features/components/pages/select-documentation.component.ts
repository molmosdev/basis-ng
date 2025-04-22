import { Component } from '@angular/core';
import { Alert } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectContentComponent } from '../../../../../../primitives/src/core/components/select/select-content.component';
import { SelectOptionComponent } from '../../../../../../primitives/src/core/components/select/select-option.component';
import { SelectComponent } from '../../../../../../primitives/src/core/components/select/select.component';

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
          <td><strong>placeholder</strong></td>
          <td><code>string</code></td>
          <td>Text displayed when no option is selected.</td>
        </tr>
        <tr>
          <td><strong>maxWidth</strong></td>
          <td><code>string</code></td>
          <td>Maximum width of the dropdown.</td>
        </tr>
      </table>
    </div>

    <h2>Events</h2>
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Event</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><strong>close</strong></td>
          <td>Emitted when the dropdown is closed.</td>
        </tr>
      </table>
    </div>

    <h2>Basic Usage</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <b-select placeholder="Select an option">
        <ul b-select-content>
          <li b-select-option value="option1">Option 1</li>
          <li b-select-option value="option2">Option 2</li>
          <li b-select-option value="option3">Option 3</li>
        </ul>
      </b-select>
    </div>

    <h2>Custom Max Width</h2>
    <code-block [code]="customMaxWidthUsage" />
    <div class="documentation-playground">
      <b-select placeholder="Select an option" maxWidth="300px">
        <ul b-select-content>
          <li b-select-option value="option1">Option 1</li>
          <li b-select-option value="option2">Option 2</li>
          <li b-select-option value="option3">Option 3</li>
        </ul>
      </b-select>
    </div>`,
  imports: [
    CodeBlockComponent,
    FormsModule,
    ReactiveFormsModule,
    Alert,
    SelectComponent,
    SelectContentComponent,
    SelectOptionComponent,
  ],
})
export default class SelectDocumentationComponent {
  angularImport = `import { SelectComponent, SelectContentComponent, SelectOptionComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/select';
@import '@basis-ng/styles/select-content';
@import '@basis-ng/styles/select-option';`;
  basicUsage = `<b-select placeholder="Select an option">
  <ul b-select-content>
    <li b-select-option value="option1">Option 1</li>
    <li b-select-option value="option2">Option 2</li>
    <li b-select-option value="option3">Option 3</li>
  </ul>
</b-select>`;
  customMaxWidthUsage = `<b-select placeholder="Select an option" maxWidth="300px">
  <ul b-select-content>
    <li b-select-option value="option1">Option 1</li>
    <li b-select-option value="option2">Option 2</li>
    <li b-select-option value="option3">Option 3</li>
  </ul>
</b-select>`;
}
