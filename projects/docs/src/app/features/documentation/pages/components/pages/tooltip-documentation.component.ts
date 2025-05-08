import { Component } from '@angular/core';
import { Alert, Button, TooltipDirective } from '@basis-ng/primitives';
import { CodeBlockComponent } from '../shared/components/code-block.component';

@Component({
  selector: 'article[app-tooltip-documentation]',
  template: `
    <b-alert type="info" title="Components are in alpha" icon="Rocket">
      Try them out! We'd love to hear your feedback! Expect breaking changes!
    </b-alert>

    <h1>Tooltip</h1>
    <span>
      The Tooltip directive allows you to display additional information when
      hovering over an element. It supports both string and template content.
    </span>

    <code-block [code]="angularImport" />
    <span>Include this to apply predefined styles.</span>

    <h2>Properties</h2>
    <div class="table-wrapper">
      <table>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><strong>bTooltip</strong></td>
          <td><code>string | TemplateRef</code></td>
          <td>The content of the tooltip.</td>
        </tr>
        <tr>
          <td><strong>size</strong></td>
          <td><code>'1' | '2' | '3'</code></td>
          <td>The size of the tooltip.</td>
        </tr>
        <tr>
          <td><strong>positions</strong></td>
          <td><code>Position[]</code></td>
          <td>The possible positions of the tooltip.</td>
        </tr>
        <tr>
          <td><strong>showDelay</strong></td>
          <td><code>number</code></td>
          <td>Delay in milliseconds before showing the tooltip.</td>
        </tr>
        <tr>
          <td><strong>hideDelay</strong></td>
          <td><code>number</code></td>
          <td>Delay in milliseconds before hiding the tooltip.</td>
        </tr>
      </table>
    </div>

    <h2>Basic Example</h2>
    <code-block [code]="basicUsage" />
    <div class="documentation-playground">
      <button b-button variant="outlined" [bTooltip]="'Tooltip content'">
        Hover me to see the tooltip
      </button>
    </div>

    <h2>Template Content</h2>
    <code-block [code]="templateUsage" />
    <ng-template #tooltipTemplate>
      <strong>Custom Template Content</strong>
    </ng-template>
    <div class="documentation-playground">
      <button b-button variant="outlined" [bTooltip]="tooltipTemplate">
        Hover me to see the tooltip
      </button>
    </div>

    <h2>Positions</h2>
    <span>
      The positions property allows you to control where the tooltip appears
      relative to the trigger element. Below are examples of different
      positions.
    </span>
    <code-block [code]="positionsUsage" />
    <div class="documentation-playground">
      <button
        b-button
        variant="outlined"
        [bTooltip]="'Top Left'"
        [positions]="['top-left']">
        Top Left
      </button>
      <button
        b-button
        variant="outlined"
        [bTooltip]="'Bottom Center'"
        [positions]="['bottom-center']">
        Bottom Center
      </button>
    </div>
  `,
  standalone: true,
  imports: [CodeBlockComponent, Button, Alert, TooltipDirective],
})
export default class TooltipDocumentationComponent {
  angularImport = `import { TooltipDirective } from '@basis-ng/primitives'`;

  basicUsage = `<button b-button [bTooltip]="'Tooltip content'">
  Hover me
</button>`;

  templateUsage = `<ng-template #tooltipTemplate>
  <strong>Custom Template Content</strong>
</ng-template>
<button b-button [bTooltip]="tooltipTemplate">
  Hover me
</button>`;

  positionsUsage = `<button b-button [bTooltip]="'Top Left'" [positions]="['top-left']">
  Top Left
</button>
<button b-button [bTooltip]="'Bottom Center'" [positions]="['bottom-center']">
  Bottom Center
</button>`;
}
