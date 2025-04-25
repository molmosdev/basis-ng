import { Component } from '@angular/core';
import { InputGroup, Input, Icon, Button, Alert } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';

@Component({
  selector: 'article[app-input-group-documentation]',
  template: `<b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Input Group</h1>
    <span>
      Input Group is a container for grouping inputs, icons, buttons, or selects
      together.
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
          <td><strong>bordered</strong></td>
          <td><code>boolean</code></td>
          <td>Whether the input group elements are separated by a border.</td>
        </tr>
        <tr>
          <td><strong>maxWidth</strong></td>
          <td><code>string</code></td>
          <td>Specifies the maximum width of the input group container.</td>
        </tr>
      </table>
    </div>

    <h2>With Input</h2>
    <code-block [code]="withInput" />
    <div class="documentation-playground">
      <b-input-group [bordered]="true" maxWidth="240px">
        <i b-icon icon="House" [size]="17"></i>
        <input type="number" b-input numberType="decimal" [value]="0" />
        <span>€</span>
      </b-input-group>
    </div>

    <h2>Bordered False Example</h2>
    <code-block [code]="borderedFalseUsage" />
    <div class="documentation-playground">
      <b-input-group [bordered]="false" maxWidth="240px">
        <span>Name:</span>
        <input type="text" b-input placeholder="Enter your name..." />
      </b-input-group>
    </div>

    <h2>Complex Example</h2>
    <code-block [code]="complexUsage" />
    <div class="documentation-playground">
      <b-input-group [bordered]="true" maxWidth="240px">
        <i b-icon icon="Search" [size]="17"></i>
        <input type="text" b-input placeholder="Search here..." />
        <button b-button variant="primary">Go</button>
      </b-input-group>
    </div>`,
  imports: [CodeBlockComponent, InputGroup, Input, Icon, Button, Alert],
})
export default class InputGroupDocumentationComponent {
  angularImport = `import { InputGroupComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/input-group';`;

  withInput = `<b-input-group [bordered]="true" maxWidth="240px">
  <i b-icon icon="House" [size]="17"></i>
  <input type="number" b-input numberType="decimal" [value]="0" />
  <span>€</span>
</b-input-group>`;

  borderedFalseUsage = `<b-input-group [bordered]="false" maxWidth="240px">
  <span>Name:</span>
  <input type="text" b-input placeholder="Enter your name..." />
</b-input-group>`;

  complexUsage = `<b-input-group [bordered]="true" maxWidth="240px">
  <i b-icon icon="Search" [size]="17"></i>
  <input type="text" b-input placeholder="Search here..." />
  <button b-button variant="primary">Go</button>
</b-input-group>`;
}
