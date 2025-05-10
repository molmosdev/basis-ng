import { Component } from '@angular/core';
import {
  AlertComponent,
  SpinnerComponent,
  ButtonComponent,
  ButtonGroupComponent,
} from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';
import { IconComponent } from '../../../../../../../../primitives/src/public-api';

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
            <code>'primary' | 'secondary' | 'ghost' | 'outlined'</code>
          </td>
          <td>The variant of the button.</td>
        </tr>
        <tr>
          <td><strong>size</strong></td>
          <td><code>'1' | '2' | '3'</code></td>
          <td>The size of the button. Default is <code>'2'</code>.</td>
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
      <button b-button variant="primary" size="2">This is a button</button>
    </div>

    <h2>Variants</h2>
    <code-block [code]="variantsUsage" />
    <div class="documentation-playground">
      <button b-button variant="primary">Primary</button>
      <button b-button variant="secondary">Secondary</button>
      <button b-button variant="ghost">Ghost</button>
      <button b-button variant="outlined">Outlined</button>
    </div>

    <h2>Sizes</h2>
    <code-block [code]="sizesUsage" />
    <div class="documentation-playground">
      <button b-button size="1">Size 1</button>
      <button b-button size="2">Size 2 (default)</button>
      <button b-button size="3">Size 3</button>
    </div>

    <h2>Loading State</h2>
    <code-block [code]="loadingUsage" />
    <div class="documentation-playground">
      <button b-button>
        <b-spinner color="var(--primary-foreground)" [size]="18" />
        Loading...
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
        <button b-button variant="outlined" size="1">Outlined</button>
        <button b-button variant="outlined" size="1">Outlined</button>
        <button b-button variant="outlined" size="1">Outlined</button>
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
        <button b-button variant="outlined" size="1">Outlined</button>
        <button b-button variant="outlined" size="1">Outlined</button>
        <button b-button variant="outlined" size="1">Outlined</button>
      </b-button-group>
    </div>

    <h2>Squared Buttons</h2>
    <code-block [code]="squaredUsage" />
    <div class="documentation-playground">
      <button b-button [squared]="true" size="1">
        <i
          b-icon
          icon="ZoomIn"
          [size]="13"
          color="var(--primary-foreground)"></i>
      </button>
      <button b-button [squared]="true" size="2">
        <i
          b-icon
          icon="ZoomOut"
          [size]="16"
          color="var(--primary-foreground)"></i>
      </button>
      <button b-button [squared]="true" size="3">
        <i
          b-icon
          icon="Search"
          [size]="20"
          color="var(--primary-foreground)"></i>
      </button>
    </div>`,

  imports: [
    CodeBlockComponent,
    ButtonComponent,
    ButtonGroupComponent,
    AlertComponent,
    SpinnerComponent,
    IconComponent,
  ],
})
export default class ButtonDocumentationComponent {
  angularImport = `import { ButtonComponent } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/button';`;
  basicUsage = `<button b-button variant="primary" size="2">This is a button</button>`;
  variantsUsage = `<button b-button variant="primary">Primary</button>
<button b-button variant="secondary">Secondary</button>
<button b-button variant="ghost">Ghost</button>
<button b-button variant="outlined">Outlined</button>`;
  sizesUsage = `<button b-button size="1">Size 1</button>
<button b-button size="2">Size 2 (default)</button>
<button b-button size="3">Size 3</button>`;
  loadingUsage = `<button b-button>
  <b-spinner color="var(--primary-foreground)" [size]="18" />
  Loading...
</button>`;
  buttonGroupUsage = `<b-button-group>
  <button b-button variant="outlined"> Outlined </button>
  <button b-button variant="outlined"> Outlined </button>
  <button b-button variant="outlined"> Outlined </button>
</b-button-group>`;

  allPrimaryUsage = `<b-button-group>
  <button b-button variant="primary"> Primary </button>
  <button b-button variant="primary"> Primary </button>
  <button b-button variant="primary"> Primary </button>
</b-button-group>`;

  mixedVariantsUsage = `<b-button-group>
  <button b-button variant="primary"> Primary </button>
  <button b-button variant="secondary"> Secondary </button>
</b-button-group>
<b-button-group>
  <button b-button variant="ghost"> Ghost </button>
  <button b-button variant="outlined"> Outlined </button>
</b-button-group>`;

  outlinedSmallUsage = `<b-button-group>
  <button b-button variant="outlined" size="1">Outlined</button>
  <button b-button variant="outlined" size="1">Outlined</button>
  <button b-button variant="outlined" size="1">Outlined</button>
</b-button-group>`;

  spacedUsage = `<b-button-group [spaced]="true">
  <button b-button variant="outlined"> Outlined </button>
  <button b-button variant="outlined"> Outlined </button>
  <button b-button variant="outlined"> Outlined </button>
</b-button-group>`;

  spacedSmallUsage = `<b-button-group [spaced]="true">
  <button b-button variant="outlined" size="1"> Outlined </button>
  <button b-button variant="outlined" size="1"> Outlined </button>
  <button b-button variant="outlined" size="1"> Outlined </button>
</b-button-group>`;

  squaredUsage = `<button b-button [squared]="true" size="1">
  <i b-icon icon="ZoomIn" [size]="13" color="var(--primary-foreground)"></i>
</button>
<button b-button [squared]="true" size="2">
  <i b-icon icon="ZoomOut" [size]="16" color="var(--primary-foreground)"></i>
</button>
<button b-button [squared]="true" size="3">
  <i b-icon icon="Search" [size]="20" color="var(--primary-foreground)"></i>
</button>`;
}
