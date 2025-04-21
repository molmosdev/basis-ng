import { Component } from '@angular/core';
import { Alert } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';

@Component({
  selector: 'article[app-alert-documentation]',
  template: `<b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>
    <h1>Alert</h1>
    <span>
      Alert is a component used to display important messages to the user.
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
          <td><strong>type</strong></td>
          <td><code>'success' | 'error' | 'warning' | 'info'</code></td>
          <td>The type of the alert.</td>
        </tr>
        <tr>
          <td><strong>title</strong></td>
          <td><code>string | null</code></td>
          <td>The title of the alert.</td>
        </tr>
        <tr>
          <td><strong>icon</strong></td>
          <td><code>string | null</code></td>
          <td>The icon of the alert.</td>
        </tr>
        <tr>
          <td><strong>dismissible</strong></td>
          <td><code>boolean</code></td>
          <td>Whether the alert can be dismissed.</td>
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
          <td><strong>dismissed</strong></td>
          <td>Emitted when the alert is dismissed.</td>
        </tr>
      </table>
    </div>

    <h2>Basic</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <b-alert type="info" title="Info Alert" icon="Info">
        This is a basic informational alert.
      </b-alert>
    </div>

    <h2>Types</h2>
    <code-block [code]="typesUsage" />
    <div class="documentation-playground">
      <b-alert type="success" title="Success" icon="CircleCheck">
        This is a success alert.
      </b-alert>
      <b-alert type="error" title="Error" icon="CircleX">
        This is an error alert.
      </b-alert>
      <b-alert type="warning" title="Warning" icon="OctagonAlert">
        This is a warning alert.
      </b-alert>
      <b-alert type="info" title="Info" icon="Info">
        This is an informational alert.
      </b-alert>
    </div>

    <h2>Dismissible</h2>
    <code-block [code]="dismissibleUsage" />
    <div class="documentation-playground">
      <b-alert type="info" [dismissible]="true" title="Info" icon="Info">
        This alert can be dismissed.
      </b-alert>
    </div>

    <h2>Max Width</h2>
    <code-block [code]="maxWidthUsage" />
    <div class="documentation-playground">
      <b-alert type="info" title="Info Alert" icon="Info" [maxWidth]="'300px'">
        This alert has a maximum width of 300px.
      </b-alert>
    </div>`,
  imports: [CodeBlockComponent, Alert],
})
export default class AlertDocumentationComponent {
  angularImport = `import { Alert } from '@basis-ng/primitives'`;

  stylesImport = `@import '@basis-ng/styles/alert';`;

  basicUsage = `<b-alert type="info" title="Info Alert" icon="Info">
  This is a basic informational alert.
</b-alert>`;

  typesUsage = `<b-alert type="success" title="Success" icon="CircleCheck">
  This is a success alert.
</b-alert>
<b-alert type="error" title="Error" icon="CircleX">
  This is an error alert.
</b-alert>
<b-alert type="warning" title="Warning" icon="OctagonAlert">
  This is a warning alert.
</b-alert>
<b-alert type="info" title="Info" icon="Info">
  This is an informational alert.
</b-alert>`;

  dismissibleUsage = `<b-alert type="info" [dismissible]="true" title="Info" icon="Info">
  This alert can be dismissed.
</b-alert>`;

  slotsUsage = `<b-alert type="success">
  This is a success alert with slots for the main content.
</b-alert>`;

  maxWidthUsage = `<b-alert type="info" title="Info Alert" icon="Info" [maxWidth]="'300px'">
  This alert has a maximum width of 300px.
</b-alert>`;
}
