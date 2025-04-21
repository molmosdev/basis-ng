import { Component } from '@angular/core';
import { Button, Icon, ButtonGroup, Alert } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';

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
          <td><code>'small' | 'default'</code></td>
          <td>The size of the button.</td>
        </tr>
        <tr>
          <td><strong>loading</strong></td>
          <td><code>boolean</code></td>
          <td>Whether the button is in a loading state.</td>
        </tr>
        <tr>
          <td><strong>equalPadding</strong></td>
          <td><code>boolean</code></td>
          <td>
            Whether the padding should be equal vertically and horizontally.
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
      <button b-button variant="primary" size="default">
        This is a button
      </button>
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
      <button b-button size="small">Small</button>
      <button b-button size="default">Default</button>
    </div>

    <h2>Loading State</h2>
    <code-block [code]="loadingUsage" />
    <div class="documentation-playground">
      <button b-button [loading]="true">Loading...</button>
    </div>

    <h2>Equal Padding</h2>
    <code-block [code]="equalPaddingUsage" />
    <div class="documentation-playground">
      <button b-button [equalPadding]="true">
        <i b-icon icon="House" [size]="16" color="var(--bg-color)"></i>
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
        <button b-button variant="outlined" size="small">Outlined</button>
        <button b-button variant="outlined" size="small">Outlined</button>
        <button b-button variant="outlined" size="small">Outlined</button>
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
        <button b-button variant="outlined" size="small">Outlined</button>
        <button b-button variant="outlined" size="small">Outlined</button>
        <button b-button variant="outlined" size="small">Outlined</button>
      </b-button-group>
    </div>

    <h3>Toggle Buttons</h3>
    <code-block [code]="toggleButtonsClickHandlingUsage" />
    <div class="documentation-playground">
      <b-button-group>
        <button
          b-button
          variant="outlined"
          [toggle]="true"
          [isToggled]="toggleState === 'option1'"
          (click)="toggleState = 'option1'">
          Option 1
        </button>
        <button
          b-button
          variant="outlined"
          [toggle]="true"
          [isToggled]="toggleState === 'option2'"
          (click)="toggleState = 'option2'">
          Option 2
        </button>
        <button
          b-button
          variant="outlined"
          [toggle]="true"
          [isToggled]="toggleState === 'option3'"
          (click)="toggleState = 'option3'">
          Option 3
        </button>
      </b-button-group>
    </div>

    <h3>Multi-Select Toggle Buttons</h3>
    <code-block [code]="multiSelectToggleUsage" />
    <div class="documentation-playground">
      <b-button-group>
        <button
          b-button
          variant="outlined"
          [toggle]="true"
          [isToggled]="isOptionToggled('option1')"
          (click)="toggleOption('option1')">
          Option 1
        </button>
        <button
          b-button
          variant="outlined"
          [toggle]="true"
          [isToggled]="isOptionToggled('option2')"
          (click)="toggleOption('option2')">
          Option 2
        </button>
        <button
          b-button
          variant="outlined"
          [toggle]="true"
          [isToggled]="isOptionToggled('option3')"
          (click)="toggleOption('option3')">
          Option 3
        </button>
      </b-button-group>
    </div>`,

  imports: [CodeBlockComponent, Button, Icon, ButtonGroup, Alert],
})
export default class ButtonDocumentationComponent {
  angularImport = `import { Button } from '@basis-ng/primitives'`;
  stylesImport = `@import '@basis-ng/styles/button';`;
  basicUsage = `<button b-button variant="primary" size="default">This is a button</button>`;
  variantsUsage = `<button b-button variant="primary">Primary</button>
<button b-button variant="secondary">Secondary</button>
<button b-button variant="ghost">Ghost</button>
<button b-button variant="outlined">Outlined</button>`;
  sizesUsage = `<button b-button size="small">Small</button>
<button b-button size="default">Default</button>`;
  loadingUsage = `<button b-button [loading]="true">Loading...</button>`;
  equalPaddingUsage = `<button b-button [equalPadding]="true">
  <i b-icon icon="House" [size]="16" color="var(--bg-color)"></i>
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
  <button b-button variant="outlined" size="small"> Outlined </button>
  <button b-button variant="outlined" size="small"> Outlined </button>
  <button b-button variant="outlined" size="small"> Outlined </button>
</b-button-group>`;

  spacedUsage = `<b-button-group [spaced]="true">
  <button b-button variant="outlined"> Outlined </button>
  <button b-button variant="outlined"> Outlined </button>
  <button b-button variant="outlined"> Outlined </button>
</b-button-group>`;

  spacedSmallUsage = `<b-button-group [spaced]="true">
  <button b-button variant="outlined" size="small"> Outlined </button>
  <button b-button variant="outlined" size="small"> Outlined </button>
  <button b-button variant="outlined" size="small"> Outlined </button>
</b-button-group>`;

  toggleState = 'option1';

  multiSelectToggled: string[] = ['option1'];

  isOptionToggled(option: string): boolean {
    return this.multiSelectToggled.includes(option);
  }

  toggleOption(option: string): void {
    if (this.isOptionToggled(option)) {
      this.multiSelectToggled = this.multiSelectToggled.filter(
        o => o !== option
      );
    } else {
      this.multiSelectToggled.push(option);
    }
  }

  toggleButtonsClickHandlingUsage = `<b-button-group>
  <button
    b-button
    variant="outlined"
    [toggle]="true"
    [isToggled]="toggleState === 'option1'"
    (click)="toggleState = 'option1'">
    Option 1
  </button>
  <button
    b-button
    variant="outlined"
    [toggle]="true"
    [isToggled]="toggleState === 'option2'"
    (click)="toggleState = 'option2'">
    Option 2
  </button>
  <button
    b-button
    variant="outlined"
    [toggle]="true"
    [isToggled]="toggleState === 'option3'"
    (click)="toggleState = 'option3'">
    Option 3
  </button>
</b-button-group>`;

  multiSelectToggleUsage = `<b-button-group>
  <button
    b-button
    variant="outlined"
    [toggle]="true"
    [isToggled]="isOptionToggled('option1')"
    (click)="toggleOption('option1')">
    Option 1
  </button>
  <button
    b-button
    variant="outlined"
    [toggle]="true"
    [isToggled]="isOptionToggled('option2')"
    (click)="toggleOption('option2')">
    Option 2
  </button>
  <button
    b-button
    variant="outlined"
    [toggle]="true"
    [isToggled]="isOptionToggled('option3')"
    (click)="toggleOption('option3')">
    Option 3
  </button>
</b-button-group>`;
}
