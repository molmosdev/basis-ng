import { Component } from '@angular/core';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import {
  Button,
  AlertComponent,
  ButtonGroup,
  SpinnerComponent,
} from '@basis-ng/primitives';

@Component({
  selector: 'article[app-button-documentation]',
  template: ` <b-alert
      type="info"
      title="Components are in alpha"
      icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Button</h1>
    <span>
      Button is an extension to standard HTML button element with additional
      features.
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
          <td><strong>variant</strong></td>
          <td>
            <code
              >'primary' | 'secondary' | 'ghost' | 'outlined' |
              'destructive'</code
            >
          </td>
          <td>
            The variant of the button. <code>destructive</code> is used for
            actions that are potentially dangerous (e.g., delete).
          </td>
        </tr>
        <tr>
          <td><strong>size</strong></td>
          <td><code>'sm' | 'md' | 'lg'</code></td>
          <td>The size of the button. Default is <code>'md'</code>.</td>
        </tr>
        <tr>
          <td><strong>active</strong></td>
          <td><code>boolean</code></td>
          <td>
            If <code>true</code>, the button will have an active state
            (highlighted ring). Default is <code>false</code>.
          </td>
        </tr>
        <tr>
          <td><strong>squared</strong></td>
          <td><code>boolean</code></td>
          <td>
            If <code>true</code>, the button will be a square (equal height and
            width), suitable for icons. Default is <code>false</code>.
          </td>
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
          <td><strong>click</strong></td>
          <td>Emitted when the button is clicked.</td>
        </tr>
      </table>
    </div>

    <h2>Basic</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <button b-button variant="primary" size="md">This is a button</button>
    </div>

    <h2>Variants</h2>
    <code-block [code]="variantsUsage" />
    <div class="documentation-playground">
      <button b-button variant="primary">Primary</button>
      <button b-button variant="secondary">Secondary</button>
      <button b-button variant="ghost">Ghost</button>
      <button b-button variant="outlined">Outlined</button>
      <button b-button variant="destructive">Destructive</button>
    </div>

    <h2>Sizes</h2>
    <code-block [code]="sizesUsage" />
    <div class="documentation-playground">
      <button b-button size="sm">Small</button>
      <button b-button size="md">Medium (default)</button>
      <button b-button size="lg">Large</button>
    </div>

    <h2>Loading State</h2>
    <code-block [code]="loadingUsage" />
    <div class="documentation-playground">
      <button b-button>
        <b-spinner size="1" type="bars" />
        Saving
      </button>
    </div>

    <h2>Button Group</h2>
    <code-block [code]="buttonGroupUsage" />
    <div class="documentation-playground">
      <b-button-group>
        <button b-button variant="outlined">Outlined</button>
        <button b-button variant="outlined">Outlined</button>
        <button b-button variant="outlined">Outlined</button>
      </b-button-group>
    </div>

    <h3>All Primary</h3>
    <code-block [code]="allPrimaryUsage" />
    <div class="documentation-playground">
      <b-button-group>
        <button b-button variant="primary">Primary</button>
        <button b-button variant="primary">Primary</button>
        <button b-button variant="primary">Primary</button>
      </b-button-group>
    </div>

    <h3>Mixed Variants</h3>
    <code-block [code]="mixedVariantsUsage" />
    <div class="documentation-playground">
      <b-button-group>
        <button b-button variant="primary">Primary</button>
        <button b-button variant="secondary">Secondary</button>
      </b-button-group>
      <b-button-group>
        <button b-button variant="ghost">Ghost</button>
        <button b-button variant="outlined">Outlined</button>
      </b-button-group>
    </div>

    <h3>Small</h3>
    <code-block [code]="outlinedSmallUsage" />
    <div class="documentation-playground">
      <b-button-group>
        <button b-button variant="outlined" size="sm">Outlined</button>
        <button b-button variant="outlined" size="sm">Outlined</button>
        <button b-button variant="outlined" size="sm">Outlined</button>
      </b-button-group>
    </div>

    <h3>Spaced Buttons</h3>
    <code-block [code]="spacedUsage" />
    <div class="documentation-playground">
      <b-button-group [spaced]="true">
        <button b-button variant="outlined">Outlined</button>
        <button b-button variant="outlined">Outlined</button>
        <button b-button variant="outlined">Outlined</button>
      </b-button-group>
    </div>

    <h3>Spaced and Small Buttons</h3>
    <code-block [code]="spacedSmallUsage" />
    <div class="documentation-playground">
      <b-button-group [spaced]="true">
        <button b-button variant="outlined" size="sm">Outlined</button>
        <button b-button variant="outlined" size="sm">Outlined</button>
        <button b-button variant="outlined" size="sm">Outlined</button>
      </b-button-group>
    </div>

    <h2>Squared Buttons</h2>
    <code-block [code]="squaredUsage" />
    <div class="documentation-playground">
      <button b-button [squared]="true" size="sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-zoom-in-icon lucide-zoom-in">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
          <line x1="11" x2="11" y1="8" y2="14" />
          <line x1="8" x2="14" y1="11" y2="11" />
        </svg>
      </button>
      <button b-button [squared]="true" size="md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-zoom-out-icon lucide-zoom-out">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
          <line x1="8" x2="14" y1="11" y2="11" />
        </svg>
      </button>
      <button b-button [squared]="true" size="lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-search-icon lucide-search">
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
      </button>
    </div>`,

  imports: [
    CodeBlockComponent,
    Button,
    ButtonGroup,
    AlertComponent,
    SpinnerComponent,
  ],
})
export default class ButtonDocumentationComponent {
  angularImport = `import { ButtonComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/button';`;
  basicUsage = `<button b-button variant="primary" size="md">This is a button</button>`;
  variantsUsage = `<button b-button variant="primary">Primary</button>
<button b-button variant="secondary">Secondary</button>
<button b-button variant="ghost">Ghost</button>
<button b-button variant="outlined">Outlined</button>
<button b-button variant="destructive">Destructive</button>`;
  sizesUsage = `<button b-button size="sm">Small</button>
<button b-button size="md">Medium (default)</button>
<button b-button size="lg">Large</button>`;
  loadingUsage = `<button b-button>
  <b-spinner size="1" type="bars" />
  Saving
</button>`;
  buttonGroupUsage = `<b-button-group>
  <button b-button variant="outlined">Outlined</button>
  <button b-button variant="outlined">Outlined</button>
  <button b-button variant="outlined">Outlined</button>
</b-button-group>`;

  allPrimaryUsage = `<b-button-group>
  <button b-button variant="primary">Primary</button>
  <button b-button variant="primary">Primary</button>
  <button b-button variant="primary">Primary</button>
</b-button-group>`;

  mixedVariantsUsage = `<b-button-group>
  <button b-button variant="primary">Primary</button>
  <button b-button variant="secondary">Secondary</button>
</b-button-group>
<b-button-group>
  <button b-button variant="ghost">Ghost</button>
  <button b-button variant="outlined">Outlined</button>
</b-button-group>`;

  outlinedSmallUsage = `<b-button-group>
  <button b-button variant="outlined" size="sm">Outlined</button>
  <button b-button variant="outlined" size="sm">Outlined</button>
  <button b-button variant="outlined" size="sm">Outlined</button>
</b-button-group>`;

  spacedUsage = `<b-button-group [spaced]="true">
  <button b-button variant="outlined">Outlined</button>
  <button b-button variant="outlined">Outlined</button>
  <button b-button variant="outlined">Outlined</button>
</b-button-group>`;

  spacedSmallUsage = `<b-button-group [spaced]="true">
  <button b-button variant="outlined" size="sm">Outlined</button>
  <button b-button variant="outlined" size="sm">Outlined</button>
  <button b-button variant="outlined" size="sm">Outlined</button>
</b-button-group>`;

  squaredUsage = `<button b-button [squared]="true" size="sm">
 <svg ... />
</button>
<button b-button [squared]="true" size="md">
 <svg ... />
</button>
<button b-button [squared]="true" size="lg">
  <svg ... />
</button>`;
}
