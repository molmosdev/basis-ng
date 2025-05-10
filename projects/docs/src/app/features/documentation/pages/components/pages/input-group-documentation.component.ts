import { Component } from '@angular/core';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import {
  InputGroupComponent,
  AlertComponent,
  InputComponent,
  IconComponent,
  ButtonComponent,
} from '@basis-ng/primitives';

@Component({
  selector: 'article[app-input-group-documentation]',
  template: `
    <b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Input Group</h1>
    <span>
      Input Group allows you to group one or more <code>b-input</code> elements
      together with additional elements such as text or buttons, before or after
      the input.
    </span>

    <code-block [code]="angularImport" />
    <span>Include this to apply the styles</span>
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
          <td><strong>maxWidth</strong></td>
          <td><code>string</code></td>
          <td>
            Sets the maximum width of the input group (e.g. <code>300px</code>,
            <code>100%</code>).
          </td>
        </tr>
      </table>
    </div>

    <h2>With prepended text</h2>
    <code-block [code]="prependTextUsage" />
    <div class="documentation-playground">
      <b-input-group maxWidth="240px">
        <span>&#64;</span>
        <input b-input type="text" placeholder="username" />
      </b-input-group>
    </div>

    <h2>With appended text</h2>
    <code-block [code]="appendTextUsage" />
    <div class="documentation-playground">
      <b-input-group maxWidth="240px">
        <input b-input type="text" placeholder="Amount" />
        <span>USD</span>
      </b-input-group>
    </div>

    <h2>With prepended button</h2>
    <code-block [code]="prependButtonUsage" />
    <div class="documentation-playground">
      <b-input-group maxWidth="240px">
        <button b-button variant="primary" size="1">Search</button>
        <input b-input type="text" placeholder="Search..." />
      </b-input-group>
    </div>

    <h2>With appended button</h2>
    <code-block [code]="appendButtonUsage" />
    <div class="documentation-playground">
      <b-input-group maxWidth="240px">
        <input b-input type="email" placeholder="Email address" />
        <button b-button variant="primary" size="1">Send</button>
      </b-input-group>
    </div>

    <h2>Combining elements</h2>
    <code-block [code]="combinedUsage" />
    <div class="documentation-playground">
      <b-input-group maxWidth="240px">
        <span>+52</span>
        <input b-input type="number" placeholder="Phone" />
        <button b-button variant="primary" size="1">Verify</button>
      </b-input-group>
    </div>

    <h2>Password input with show/hide button</h2>
    <code-block [code]="passwordToggleUsage" />
    <div class="documentation-playground">
      <b-input-group maxWidth="240px">
        <input
          b-input
          [type]="showPassword ? 'text' : 'password'"
          placeholder="Password"
          type="password" />
        <button
          b-button
          variant="ghost"
          size="1"
          type="button"
          (click)="showPassword = !showPassword"
          [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
          <i b-icon [icon]="showPassword ? 'EyeOff' : 'Eye'" [size]="16"></i>
        </button>
      </b-input-group>
    </div>
  `,
  imports: [
    AlertComponent,
    CodeBlockComponent,
    InputGroupComponent,
    ButtonComponent,
    InputComponent,
    IconComponent,
  ],
  standalone: true,
})
export default class InputGroupDocumentationComponent {
  angularImport = `import { InputGroup, Input } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/input-group';`;

  prependTextUsage = `<b-input-group maxWidth="240px">
  <span>@</span>
  <input b-input type="text" placeholder="username" />
</b-input-group>`;

  appendTextUsage = `<b-input-group maxWidth="240px">
  <input b-input type="text" placeholder="Amount" />
  <span>USD</span>
</b-input-group>`;

  prependButtonUsage = `<b-input-group maxWidth="240px">
  <button b-button variant="primary" size="1">Search</button>
  <input b-input type="text" placeholder="Search..." />
</b-input-group>`;

  appendButtonUsage = `<b-input-group maxWidth="240px">
  <input b-input type="email" placeholder="Email address" />
  <button b-button variant="primary" size="1">Send</button>
</b-input-group>`;

  combinedUsage = `<b-input-group maxWidth="240px">
  <span>+52</span>
  <input b-input type="number" placeholder="Phone" />
  <button b-button variant="primary" size="1">Verify</button>
</b-input-group>`;

  showPassword = false;

  passwordToggleUsage = `<b-input-group maxWidth="240px">
  <input
    b-input
    [type]="showPassword ? 'text' : 'password'"
    placeholder="Password"
    type="password"/>
  <button
    b-button
    variant="ghost"
    size="1"
    type="button"
    (click)="showPassword = !showPassword"
    [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
    <i b-icon [icon]="showPassword ? 'EyeOff' : 'Eye'" [size]="16"></i>
  </button>
</b-input-group>`;
}
